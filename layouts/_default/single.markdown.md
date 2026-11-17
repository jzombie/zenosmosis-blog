# {{ .Title }}

> {{ with .Description }}{{ . }}{{ else }}{{ .Summary | plainify }}{{ end }}

Published: {{ .Date.Format "2006-01-02" }}
Source: {{ .Permalink }}
{{ with .Params.tags }}Tags: {{ delimit . ", " }}{{ end }}

{{ .RawContent }}
