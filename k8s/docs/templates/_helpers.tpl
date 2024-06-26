{{- define "docsServiceName" -}}
docs{{ if .Values.prVersion }}-{{ .Values.prVersion }}{{ end }}
{{- end -}}
