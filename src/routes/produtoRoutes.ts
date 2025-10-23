import { Router } from "express";
import { ProdutoController } from "../controllers/ProdutoController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const userController = new ProdutoController();

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

router.get("/", (req, res) => userController.getAll(req, res));

/**
 * @swagger
 * /api/produto/{id}:
 *   get:
 *     summary: Busca Produto por ID
 *     tags: []
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
router.get("/:id", (req, res) => userController.getById(req, res));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria novo usuário
 *     tags: [Users]
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
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", (req,res) => userController.create(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza usuário
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", (req, res) => userController.update(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Remove usuário
 *     tags: [Users]
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
 *         description: Usuário removido
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", (req,res) => userController.delete(req, res));

export default router;