const express = require('express');

const router = express.Router();

const pool = require('../config/db');

router.get('/search', async(req,res)=>{

    try{

        const q = req.query.q;

        const result = await pool.query(
            `SELECT *
             FROM villages_data
             WHERE village ILIKE $1
             LIMIT 20`,
            [`%${q}%`]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/states', async(req,res)=>{

    try{

        const result = await pool.query(
            'SELECT DISTINCT state FROM villages_data ORDER BY state'
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/districts/:state', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT DISTINCT district
             FROM villages_data
             WHERE state=$1
             ORDER BY district`,
            [req.params.state]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/subdistricts/:district', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT DISTINCT sub_district
             FROM villages_data
             WHERE district=$1
             ORDER BY sub_district`,
            [req.params.district]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/villages/:subdistrict', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT village
             FROM villages_data
             WHERE sub_district=$1
             ORDER BY village`,
            [req.params.subdistrict]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/districts/:state', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT DISTINCT district
             FROM villages_data
             WHERE state=$1
             ORDER BY district`,
            [req.params.state]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/subdistricts/:district', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT DISTINCT sub_district
             FROM villages_data
             WHERE district=$1
             ORDER BY sub_district`,
            [req.params.district]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

router.get('/villages/:subdistrict', async(req,res)=>{

    try{

        const result = await pool.query(
            `SELECT village
             FROM villages_data
             WHERE sub_district=$1
             ORDER BY village`,
            [req.params.subdistrict]
        );

        res.json(result.rows);

    }catch(err){
        res.status(500).json(err.message);
    }

});

module.exports = router;