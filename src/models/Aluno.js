const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um email válido']
  },
  mediaFinal: {
    type: Number,
    required: [true, 'Média final é obrigatória'],
    min: [0, 'A média não pode ser menor que 0'],
    max: [10, 'A média não pode ser maior que 10']
  },
  nivelAcademico: {
    type: String,
    required: [true, 'Nível acadêmico é obrigatório'],
    enum: {
      values: ['Técnico', 'Graduação', 'Mestrado', 'Doutorado', 'Nenhum'],
      message: '{VALUE} não é um nível acadêmico válido'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Aluno', alunoSchema); 