output "container_name" {
  description = "Nome do container provisionado pelo Terraform"
  value       = docker_container.devstore.name
}

output "container_id" {
  description = "Identificador do container provisionado"
  value       = docker_container.devstore.id
}

output "application_url" {
  description = "Endereco para acesso a API DevStore"
  value       = "http://localhost:${var.external_port}"
}