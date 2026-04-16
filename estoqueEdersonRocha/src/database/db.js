import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Conectado ao MongoDB!");
	} catch (error) {
		console.error("Erro ao conectar ao MongoDB:", error);
	}
};

export default connectToDatabase;
