variable "container_name" {
  description = "Nome do container DevStore gerenciado pelo Terraform"
  type        = string
  default     = "devstore-iac"
}

variable "image_name" {
  description = "Imagem Docker utilizada pela aplicacao"
  type        = string
  default     = "devstore:1.0.0"
}

variable "external_port" {
  description = "Porta externa utilizada para acessar a aplicacao"
  type        = number
  default     = 3001
}