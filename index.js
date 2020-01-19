const express = require('express');
const moment = require('moment');

const app = express();
app.use(express.json())

app.get('/', (req, res)=> {
    if(req.query.year) {
        if(isNaN(parseInt(req.query.year))) {
            res.json({error: "Incorrect year"}).end();
        } else {
        const date = moment();
        date.year(req.query.year);
        date.dayOfYear(256);
        res.json({ date: date.format('DD/MM/YYYY')}).end();
        }
    }
    else if(req.query.currentDate){
        if(isNaN(parseInt(req.query.currentDate))) {
            res.json({error: "Incorrect current date"}).end();
        } else {
        const date = req.query.currentDate;
        const day = parseInt(date.slice(0, 2));
        const month = parseInt(date.slice(2, 4));
        const year = date.slice(4, 8);
        const numOfD = [31, [29, 28], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if((month < 1 || month > 12) || ((month !== 2 && (day < 1 || day > numOfD[month-1])) || (month == 2 && (day < 1 || day > numOfD[month - 1][(year % 4 === 0) ? 0 : 1])))) {
            res.json({error: "Incorrect month or day"}).end()
        } else {
            const dd = moment();
            dd.month(month - 1);
            dd.date(day);
            dd.year(year);
            const prg = moment(dd);
            prg.dayOfYear(256);
            console.log(dd._d, prg._d)
            if(dd > prg) {
                const newD = moment(dd);
                newD.year(dd.year()+1);
                newD.dayOfYear(256);
                res.json({date: newD.diff(dd, 'days')}).end();
            } else {
                res.json({date: prg.diff(dd, 'days')}).end();
            }
        }
        }
    }else {
        res.end()
    }
})

app.listen(3000, ()=>{});