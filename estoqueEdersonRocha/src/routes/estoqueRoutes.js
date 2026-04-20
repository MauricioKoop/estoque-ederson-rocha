import express from "express";
import MaterialModel from "../models/material.model.js";

const rounter = express.Router();

//endpoint para pegar todos os materiais do banco de dados
rounter.get("/", async (req, res) => {
	try {
		const material = await MaterialModel.find({});

		res.status(201).json(material);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//endpoint para buscar um material pelo ID
rounter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const material = await MaterialModel.findById(id);

		res.status(201).json(material);
	} catch (error) {
		res.status(501).send(error.message);
	}
});

//endpoint para atualizar um dado do material pelo seu ID
rounter.patch("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const material = await MaterialModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		res.status(200).json(material);
	} catch (error) {
		res.status(501).send(error.message);
	}
});

//endpoitn para cadastrar um novo material no banco de dados
rounter.post("/", async (req, res) => {
	try {
		const material = await MaterialModel.create(req.body);

		res.status(201).json(material);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//endpoint para deletar um material do banco de dados
rounter.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const material = await MaterialModel.findByIdAndDelete(id);

		res.status(200).json(material);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

export default rounter;
