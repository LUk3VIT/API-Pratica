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
 *              - tipo
 *          properties:
 *              id:
 *                  type: integer
 *                  description: ID único do produto
 *              name: 
 *                  type: string
 *                  description: Nome do produto
 *              tipo:
 *                  type: string
 *                  description: Categoria do produto
 */

/**
 * @swagger
 * /api/produto:
 *   get:
 *     summary: Lista todos os Produtos
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Nenhum Produto encontrado
 */

router.get("/", (req, res) => ProdutosController.get(req, res));

/**
 * @swagger
 * /api/produto/{name}:
 *   get:
 *     summary: Busca Produto por Name
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Produto
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
 *     summary: Cria novo Produtos
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
 *               - tipo
 *             properties:
 *               name:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 */
router.post("/", (req,res) => ProdutosController.create(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza Produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:name", (req, res) => ProdutosController.update(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove Produto
 *     tags: [Produto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Produto removido
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", (req,res) => ProdutosController.delete(req, res));

export default router;