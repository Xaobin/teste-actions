const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

// Listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.render('listAlunos', { alunos });
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao listar alunos' });
  }
});

// Formulário para adicionar aluno 
router.get('/add', (req, res) => {
  res.render('addAluno');
});

// Adicionar novo aluno
router.post('/add', async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.redirect('/');
  } catch (error) {
    res.status(400).render('error', { message: 'Erro ao adicionar aluno' });
  }
});

// Formulário para atualizar aluno
router.get('/edit/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    res.render('altAluno', { aluno });
  } catch (error) {
    res.status(404).render('error', { message: 'Aluno não encontrado' });
  }
});

// Atualizar aluno
router.post('/edit/:id', async (req, res) => {
  try {
    await Aluno.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  } catch (error) {
    res.status(400).render('error', { message: 'Erro ao atualizar aluno' });
  }
});

// Formulário para excluir aluno
router.get('/delete/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    res.render('delAluno', { aluno });
  } catch (error) {
    res.status(404).render('error', { message: 'Aluno não encontrado' });
  }
});

// Excluir aluno
router.post('/delete/:id', async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.status(400).render('error', { message: 'Erro ao excluir aluno' });
  }
});

// Localizar aluno individual
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const alunos = await Aluno.find({
      $or: [
        { nome: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    });
    res.render('listAlunos', { alunos, query });
  } catch (error) {
    res.status(500).render('error', { message: 'Erro ao buscar alunos' });
  }
});

module.exports = router; 