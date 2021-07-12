const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
//const Excel = require('exceljs');

/*
router.get('/xlsx', (req, res, next) => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('EdsonBorges');

    worksheet.columns = [
        {header: 'Codigo', key: 'id', width: 10},
        {header: 'Nome', key: 'name', width: 50}, 
        {header: 'DATA', key: 'dob', width: 15,}
    ];

    worksheet.addRow({id: 1, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 3, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 4, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 5, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 6, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 7, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 8, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 9, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 10, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 11, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 12, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 13, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 14, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 15, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 16, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 17, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 18, name: 'Jane Doe', dob: new Date(1965, 1, 7)});
    worksheet.addRow({id: 19, name: 'Edson Borges', dob: new Date(1970, 1, 1)});
    worksheet.addRow({id: 20, name: 'Jane Doe', dob: new Date(1965, 1, 7)});

    workbook.xlsx.writeFile('edson.xlsx');

    console.log('file is written');

    res.status(200).send({
        response: "Arquivo xlsx criado."
    });
});
*/

router.get('/', (req, res, next) => {
    //res.status(200).send({
    //    mensagem: 'Lendo um produto com GET de PRODUTOS.'
    //});
    mysql.getConnection((error, conn) => {
        if(error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, field) => {
                conn.release();
                if(error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).send({
                    response: result
                });
            }

        )
    });
});

router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error) {
            return res.status(500).send({
                error: error,
                response: null
            });
        }
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produto],
            (error, resultado, field) => {
                conn.release();
                if(error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(200).send({
                    response: resultado
                });
            }
        )
    })
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso.',
                    id_produto: resultado.insertId
                });
            }
        )
    });
});


module.exports = router;