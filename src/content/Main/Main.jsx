import React, { useState } from "react";

function Main() {
    const [sel, setSel] = useState("")
    const [title, setTitle] = useState("")
    const [eps, setEps] = useState("")
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [result, setResult] = useState(0)

    const selectFun = (e) => {
        setSel(e.target.value)
        switch (Number(e.target.value)) {
            case 1:
                setResult(0)
                setA("")
                setB("")
                setEps("")
                setTitle("Формула средних прямоугольников")
                break;
            case 2:
                setResult(0)
                setA("")
                setB("")
                setEps("")
                setTitle("Формула трапеций")
                break;
            case 3:
                setResult(0)
                setA("")
                setB("")
                setEps("")
                setTitle("Формула Симпсона")
                break;
            default:
                break;
        }
    }


    const fun1 = (n) => {
        var i1 = 0
        var i2 = 0
        var h = (b - a) / n
        var l = a
        var r = a + h
        for (let i = 0; i < n; ++i) {
            var f = Math.sin((l + r) / 2.0) * (r - l)
            l += h
            r += h
            i1 += f
        }

        h = (b - a) / (2 * n)
        l = a
        r = a + h
        for (let i = 0; i < 2 * n; ++i) {
            var f = Math.sin((l + r) / 2.0) * (r - l)
            l += h
            r += h
            i2 += f
        }

        var res = Math.abs(i2 - i1) / 3.0

        console.log(i2 + " " + i1 + " " + n)

        console.log(res)
        if (res > eps) {
            fun1(2 * n)
        } else {
            setResult(i2)
        }
    }

    return (
        <>
            <header className="header">
                <div className="header__content">
                    <p className="header__text">Квадратная формула: </p>
                    <select name="" id="" className="header__select" onChange={selectFun}>
                        <option value="" disabled selected>Выбрать вариант</option>
                        <option value="1">Формула средних прямоугольников</option>
                        <option value="2">Формула трапеций</option>
                        <option value="3">Формула Симпсона</option>
                    </select>
                </div>
            </header>
            <main className="main">
                {sel != "" &&
                    <div className="main__content">
                        <h1 className="main__text">
                            {title}
                        </h1>
                        <div className="main__wrap">
                            <div className="main__wrap-input">
                                <label htmlFor="eps">ε = </label>
                                <input type="text" className="main__eps" name="eps" required value={eps} onChange={(e) => {
                                    if(e.target.value.match(/^\d*(\.\d*)?$/)) 
                                        setEps(e.target.value)
                                }} />
                            </div>
                            <div className="main__wrap-input">
                                <label htmlFor="a">a = </label>
                                <input type="text" className="main__eps" name="a" required  value={a} onChange={(e) => {
                                    if (e.target.value.match(/^\d*$/)) 
                                        setA(Number(e.target.value))
                                }} />
                            </div>
                            <div className="main__wrap-input">
                                <label htmlFor="b">b = </label>
                                <input type="text" className="main__eps" name="b" required  value={b} onChange={(e) => {
                                    if (Number(e.target.value) !== NaN) {
                                        setB(Number(e.target.value))
                                    } else {
                                        setB("")
                                    }
                                }} />
                            </div>
                            <button className="main__start" onClick={() => { fun1(1) }}>Получить ответ</button>
                        </div>
                        <h1 className="main__text">
                            {result != 0 &&
                                "Приблизительное значение = " + result
                            }
                        </h1>
                    </div>
                }
            </main>
        </>)
}

export default Main;