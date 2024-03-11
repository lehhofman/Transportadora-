const express = require('express');
const con = require('../connection/mysql');

// CRUD - CREATE
const addRota = (req, res) => {
    if (req.body != null && req.body.origem != null && req.body.destino != null && req.body.distancia != null) {
        const { origem, destino, distancia } = req.body;
        con.query('INSERT INTO Rota (origem, destino, distancia) VALUES (?, ?, ?)', [origem, destino, distancia], (err, result) => {
            if (err) {
                res.status(500).json('Erro ao adicionar rota');
            } else {
                req.body.id = result.insertId;
                res.status(201).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

// CRUD - READ
const getRota = (req, res) => {
    if (req.params.id != null) {
        con.query('SELECT * FROM Rota WHERE idRota = ?', [req.params.id], (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar rota');
            } else {
                res.json(result);
            }
        });
    } else {
        con.query('SELECT * FROM Rota', (err, result) => {
            if (err) {
                res.status(500).send('Erro ao listar rota');
            } else {
                res.json(result);
            }
        });
    }
}

// CRUD - UPDATE
const updateRota = (req, res) => {
    if (req.body != null && req.body.origem != null && req.body.destino != null && req.body.distancia != null && req.body.idRota != null) {
        const { origem, destino, distancia, idRota } = req.body;
        con.query('UPDATE Rota SET origem=?, destino=?, distancia=? WHERE idRota = ?', [origem, destino, distancia, idRota], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(req.body);
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

// CRUD - DELETE
const deleteRota = (req, res) => {
    if (req.params != null && req.params.id != null) {
        const { id } = req.params;

        // Verifica se existem registros relacionados em outras tabelas
        con.query('SELECT COUNT(*) AS count FROM entrega WHERE idRota = ?', [id], (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                const rowCount = result[0].count;
                if (rowCount > 0) {
                    res.status(400).json('Não é possível excluir a rota porque existem entregas associadas a ela.');
                } else {
                    con.query('DELETE FROM Rota WHERE idRota = ?', [id], (err, result) => {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            if (result.affectedRows == 0) {
                                res.status(404).json('Rota não encontrada');
                            } else {
                                res.status(200).json('Rota removida com sucesso');
                            }
                        }
                    });
                }
            }
        });
    } else {
        res.status(400).json('Favor enviar todos os campos obrigatórios');
    }
}

module.exports = {
    addRota,
    getRota,
    updateRota,
    deleteRota
}