import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuários',
            version: '1.0.0',
            description: 'API REST para o gerenciamento de usuários',
        },
        servers :[
            {
                url: 'http://localhost:8080',
                description: 'Servidor de desenvolvimetno',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

export const swaggerSpec = swaggerJSDoc(options);