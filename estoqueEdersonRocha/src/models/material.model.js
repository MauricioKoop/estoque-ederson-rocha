import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
	codigoNumerico: { type: String, required: true, unique: true }, // unique evita códigos duplicados
	nomeMaterial: { type: String, required: true },
	saldoEstoque: { type: Number, required: true, default: 0 }, // Alterado para Number
	data: { type: Date, default: Date.now }, // Date.now gera a data automaticamente
});

const MaterialModel = mongoose.model("Material", materialSchema);

export default MaterialModel;
