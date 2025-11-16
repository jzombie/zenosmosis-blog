---
title: "\"Fastest Database?\" TPC-H is the Benchmark that calls their bluff"
date: 2025-11-16T00:00:00Z
description: "What is \"fast\" anyway?..."
tags: ["databases", "tpc-h", "benchmarks", "performance", "audits"]
---

You’ve seen the claims.

Seemingly every database vendor, from legacy giants to brand-new startups, has a chart or some blog posts claiming that they are the “fastest.” But what does “fast” even mean?

Is it “fast” for one person running one query on a perfectly quiet system?

Or is it “fast” for a whole team of analysts running end-of-quarter reports while new sales data is pouring in?

This is the exact problem the TPC-H benchmark was built to solve. It’s not just a performance test; it’s a simulation of a real, chaotic, ad-hoc business environment. It’s one of the best tools we have for cutting through the marketing hype and seeing how a data warehouse really performs.

Let’s break down what it is and why its “secret ingredient” is so important.

## What is TPC-H and why is it Important?

TPC-H (from the **[Transaction Processing Performance Council](https://www.tpc.org/)**) is a standardized benchmark for measuring how well a database (and the hardware it runs on) handles analytical / decision-support workloads. The *“-H”* suffix historically stands for “ad-hoc”, reflecting that the benchmark is built around business-oriented ad-hoc queries rather than fixed canned reports.

The official description from https://www.tpc.org/tpch/ says that:
> *“TPC-H is a decision support benchmark… consists of a suite of business oriented ad-hoc queries and concurrent data modifications… examine large volumes of data, execute queries with a high degree of complexity, and give answers to critical business questions.”*

The current specification can be found at: https://www.tpc.org/tpc_documents_current_versions/current_specifications5.asp

The TPC also maintains an official results database. To claim an official TPC-H result, vendors must follow the full specification, publish a full disclosure report (FDR), and pass an independent audit. Those results are the only ones that are directly comparable across platforms.

By contrast, many blog posts and marketing pages run “TPC-H like” queries or data and then report numbers without going through the TPC disclosure and audit process. Those can be useful for engineering discussion or internal testing, but they should be treated as informal benchmarks, not official TPC-H results, and taken with a grain of salt when used for vendor-to-vendor comparison.

## What it measures

TPC-H, an OLAP (Online Analytical Processing) benchmark, is aimed squarely at data warehousing / decision support systems, not transactional OLTP (Online Transaction Processing) apps.  Although there are elements of transaction-based concurrent processing, the main focus is on its decision support performance.

- **Complex joins and aggregations**  
  Most queries join 4-8 tables, do group-bys, HAVING, subqueries, correlated subqueries, etc.

- **Scan-heavy workloads**  
  Many queries touch large portions of the fact tables (especially lineitem and orders) at increasing scale factors.

- **Ad-hoc, business-style logic**. 
  The 22 queries correspond to “business questions” like:
    - Pricing summaries (Q1)
    - Minimum-cost supplier (Q2)
    - Market share by nation (Q8)
    - Promotion effect (Q14)
    - Dormant high-balance customers (Q22)

- **Single-stream and multi-stream performance**
  The composite metric QphH@Size (TPC-H Queries per Hour at a specific Scale Factor) is a geometric mean of two separate tests:
    - **Power** *(@Size)*: A single-stream test where all 22 queries (Q1-Q22) are run sequentially. This measures the raw query optimization and execution speed.

    - **Throughput** *(@Size)*: A multi-stream test where multiple concurrent query streams (each running Q1-Q22) are executed at the same time as the two data modification (Refresh) streams. This measures the system’s scalability and concurrency handling under load.

    - *@Size*: This refers to the Scale Factor (SF), which defines the database size. SF1 = 1 GB, SF100 = 100 GB, SF30000 = 30 TB, etc. An official result is always tied to a specific scale factor.

    - **Concurrent data modifications (refresh functions)**  
        TPC-H isn’t just a read-only benchmark. The test requires two “Refresh Functions” (RF1: New Orders/Line items, RF2  [The “Old Sales” refresh function]: Deleted orders) to be run concurrently with the query “throughput” streams. This tests the system’s ability to handle a mixed workload–running complex analytical queries on data that is simultaneously being changed (inserts and deletes). This measures the effectiveness of the system’s concurrency control (e.g. locking, snapshot isolation) and its ability to maintain high query performance without blocking or failing during data manipulation.

So, when a vendor posts an official TPC-H result, it is an end-to-end measure of:

- Query optimization quality
- Execution engine (joins, grouping, sort, aggregation, parallelism)
- IO subsystem and storage layout
- Hardware (CPU, memory, disks)
- …and concurrency handling for analytical workloads

Unofficial numbers that do not appear in the TPC results database and do not include a full disclosure report may still be interesting, but they are not directly comparable to audited TPC-H results and should be interpreted accordingly.

## The TPC-H schema

The benchmark’s data model simulates a wholesale supplier’s business. It consists of 8 tables. The complexity of the queries comes from joining these tables in various ways.

- **Fact Tables (Large & Growing):**
    - `lineitem`: The largest table, with ~6 million rows per Scale Factor (SF).
    - `orders`: The second-largest table, with ~1.5 million rows per SF.

- **Dimension Tables (Smaller):**
    - `part`, `partsupp`, `supplier`, `customer`

- **Static Tables (Tiny):**
    - `nation`, `region`

Understanding this, you can see how queries joining `lineitem`, `orders`, `customer`, `supplier`, and `nation` (like the queries `Q5`, `Q7`, `Q8` mentioned below) become complex tests of the join engine.

## The TPC-H queries

TPC-H is divided into 22 SQL queries. Here is a high-level overview of what they summarize.

### Q1: Pricing Summary Report

*Business question:* Summarize quantities, prices, discounts, and charges for all line items shipped by a given cutoff date, grouped by return status and line status.

### Q2:  Minimum Cost Supplier

*Business question:* In a given region, for each part of a specified type and size, which supplier offers it at the lowest supply cost, preferring suppliers with the highest account balances when there are ties?

### Q3: Shipping Priority

*Business question:* For a given market segment and cutoff date, which unshipped orders have the highest potential revenue and should be prioritized for shipping?

### Q4: Order Priority Shipping

*Business question:* For a given quarter, how many orders in each priority level had at least one line item delivered late relative to its committed date?

### Q5: Local Supplier Volume

*Business question:* For a given year and region, how much revenue comes from orders where the customer and supplier are in the same nation, aggregated per nation in that region?

### Q6: Forecasting Revenue Change

*Business question:* For a given year, how much additional revenue would have been earned if discounts in a specific range had been removed for qualifying low-quantity line items?

### Q7: Volume Shipping

*Business question:* For two specific nations, what gross discounted revenue was generated by goods shipped between them in 1995 and 1996, broken down by supplier nation, customer nation, and year, to support shipping contract negotiations?

### Q8: National Market Share

*Business question:* For a given part type and region, how does a given nation’s revenue-based market share change between 1995 and 1996?

### Q9: Product Type Profit Measure

*Business question:* For a given product line (parts whose name contains a specified substring), what profit is generated each year in each supplier nation, where profit is revenue minus supply cost?

### Q10: Returned Item Reporting

*Business question:* For a given quarter, which 20 customers caused the most lost revenue by returning items, and how much revenue was lost for each of them?

### Q11: Important Stock Identification

*Business question:* In a given nation, which parts represent a significant share of the total inventory value?

### Q12: Shipping Modes and Order Priority

*Business question:* For two selected shipping modes, how many late deliveries do they produce in a given year, and are high-priority orders (URGENT/HIGH) being delivered late more often than lower-priority ones?

### Q13: Customer Distribution

*Business question:* How are customers distributed by number of orders, including customers with zero orders, excluding certain special orders?

### Q14: Promotion Effect

*Business question:* What percentage of shipped revenue in a given month came from “promo” parts?

### Q15: Top Supplier

*Business question:* Which supplier(s) generated the most revenue from shipped parts in a given quarter?

### Q16: Parts/Supplier Relationship

*Business question:* For selected part sizes, how many suppliers can provide parts that meet a customer’s requirements, excluding a given brand, a given type prefix, and suppliers with registered complaints, grouped by brand, type, and size?

### Q17: Small-Quantity-Order Revenue

*Business question:* If we stopped taking orders for a given brand and container where the quantity is less than 20% of that part’s historical average order quantity, how much gross (undiscounted) revenue would we lose per year on average over the 7-year period?

### Q18: Large Volume Customer

*Business question:* For large-quantity orders (total quantity above a threshold), which 100 orders have the highest total price, and which customers placed them?

### Q19: Discounted Revenue

*Business question:* What gross discounted revenue is generated by orders for three specific branded part profiles, defined by size, container, and quantity ranges, that are shipped by air and delivered in person?

### Q20: Potential Part Promotion

*Business question:* Which suppliers in a given nation have excess stock of parts whose names match a given pattern (e.g., color-prefixed), where “excess” means more than 50% of the quantity they shipped of that part in a given year, making them candidates for promotion?

### Q21: Suppliers Who Kept Orders Waiting

*Business question:* In a given nation, which suppliers were the sole cause of late delivery in completed multi-supplier orders, and how many such orders did they delay?

### Q22: Global Sales Opportunity

*Business question:* For a chosen set of country codes, how many customers with no orders and above-average positive account balances are there, and what is the total of those balances?
