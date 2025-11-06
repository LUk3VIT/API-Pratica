import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const ProdutosController = new ProdutoController();

router.use(authMiddleware);

/**
 * @swagger
 * components:
 *  schemas:
 *      Produto:
 *          type: object
 *          required:
 *              - name
 *              - preco
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID único do produto
 *              name:
 *                  type: string
 *                  description: Nome do produto
 *              preco:
 *                  type: number
 *                  description: Preço do produto
 */

/**
 * @swagger
 * /api/produto:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Nenhum produto encontrado
 */
router.get("/", (req, res) => ProdutosController.get(req, res));

/**
 * @swagger
 * /api/produto/{name}:
 *   get:
 *     summary: Busca produto por nome
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:name", (req, res) => ProdutosController.getByName(req, res));

/**
 * @swagger
 * /api/produto:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - preco
 *             properties:
 *               name:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 */
router.post("/", (req, res) => ProdutosController.create(req, res));

/**
 * @swagger
 * /api/produto/{name}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome atual do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 description: Novo nome (opcional)
 *               preco:
 *                 type: number
 *                 description: Novo preço (opcional)
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:name", (req, res) => ProdutosController.update(req, res));

/**
 * @swagger
 * /api/produto/{name}:
 *   delete:
 *     summary: Remove um produto existente
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do produto a remover
 *     responses:
 *       200:
 *         description: Produto removido
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:name", (req, res) => ProdutosController.delete(req, res));

export default router;