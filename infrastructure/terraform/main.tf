terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "4.7.0"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

data "docker_image" "devstore" {
  name = var.image_name
}

resource "docker_container" "devstore" {
  name    = var.container_name
  image   = data.docker_image.devstore.id
  restart = "unless-stopped"

  ports {
    internal = 3000
    external = var.external_port
  }
}