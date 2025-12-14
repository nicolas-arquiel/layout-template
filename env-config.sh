#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔨 Iniciando build y push de ucugestion-front...${NC}"

REGISTRY="registry.ucu.edu.ar"
PROJECT="prod"
IMAGE_NAME="ucugestion-front"
TAG="latest"
FULL_IMAGE_NAME="${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${TAG}"

echo -e "${BLUE}📦 Building imagen: ${FULL_IMAGE_NAME}${NC}"
if docker build -f Dockerfile.prod -t "${FULL_IMAGE_NAME}" .; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Pushing imagen al registry...${NC}"
if docker push "${FULL_IMAGE_NAME}"; then
    echo -e "${GREEN}✅ Push exitoso${NC}"
    echo -e "${GREEN}🎉 Imagen ${FULL_IMAGE_NAME} lista para deploy${NC}"
else
    echo -e "${RED}❌ Error en el push${NC}"
    exit 1
fi
