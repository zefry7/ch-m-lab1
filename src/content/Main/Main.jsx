import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Main() {
    const dispath = useDispatch()
    const eps = useSelector(state => state.eps)
    const a = useSelector(state => state.a)
    const b = useSelector(state => state.b)
    const title = useSelector(state => state.title)
    const result = useSelector(state => state.result)

    var A, B = 0

    const [sel, setSel] = useState("")
    const [integ, setInteg] = useState(1)
    const [numFunc, setNumFunc] = useState(1)
    const count = useRef(0)
    const countNesob = useRef(0)

    const reset = (name) => {
        count.current = 0
        countNesob.current = 0
        dispath({ type: "set_result", result: { result: "%" } })
        dispath({ type: "set_a", a: "" })
        dispath({ type: "set_b", b: "" })
        dispath({ type: "set_eps", eps: "" })
        dispath({ type: "set_title", title: name })
    }

    const selectMethod = (v) => {
        switch (v) {
            case 1:
                reset("Формула средних прямоугольников")
                break;
            case 2:
                reset("Формула трапеций")
                break;
            case 3:
                reset("Формула Симпсона")
                break;
            default:
                break;
        }
    }

    const selectFun = (num) => {
        switch (numFunc) {
            case 1:
                return Math.sin(num)
            case 2:
                return Math.cos(num)
            case 3:
                return num * num
            case 4:
                return Math.sqrt(num)
            case 5:
                return (1.0 / parseFloat(num * num))
        }
    }

    const start = (n) => {
        A = parseFloat(a)
        B = parseFloat(b)
        if (A === "" || B === "" || eps === "") {
            alert("Не все значения определены")
            return
        } else if (A >= B) {
            alert("Значение а больше или равно b")
            return
        } else if (A == 0 && numFunc == 5) {
            alert("Значение а не может быть нулём")
            return
        } else if (B == 0 && (sel == 3 || sel == 2) && numFunc == 5) {
            alert("Значение b не может быть нулём")
            return
        } else if (!(A >= 0 && B >= 0) && numFunc == 4) {
            alert("Значения не могут быть отрицательными")
            return
        }

        count.current = 0
        countNesob.current = 0
        dispath({ type: "set_result", result: {} })

        if (integ == 1) {
            opred(n)
        } else {
            nesobst(B, 1)
        }
    }

    const funOpred = (n) => {
        var res = 0
        var h = (B - A) / n
        var l = A
        var r = A + h

        for (let i = 0; i < n; ++i) {
            var f = 0
            switch (sel) {
                case 1:
                    f = selectFun((l + r) / 2.0) * (r - l)
                    break;
                case 2:
                    f = ((selectFun(l) + selectFun(r)) / 2.0) * (r - l)
                    break;
                case 3:
                    f = ((selectFun(l) + 4 * selectFun((l + r) / 2.0) + selectFun(r)) / 6.0) * (r - l)
                    break;
            }
            l += h
            r += h
            res += f
        }
        return res
    }

    const opred = (n) => {
        var i1 = funOpred(n)
        var i2 = funOpred(2 * n)
        var s = sel === 3 ? 15.0 : 7.0
        var res = Math.abs(i2 - i1) / s

        count.current++;

        if (res > eps && count.current < 20) {
            opred(2 * n)
        } else if (count.current < 20) {
            console.log(i2, 2 * n);
            dispath({ type: "set_result", result: { result: i2, n: (2 * n) } })
        } else {
            dispath({ type: "set_result", result: { result: "Ошибка" } })
        }
    }

    const funNesobst = (b, n) => {
        var res = 0
        var h = (b - A) / n
        var l = A
        var r = A + h

        for (let i = 0; i < n; ++i) {
            var f = 0
            switch (sel) {
                case 1:
                    f = selectFun((l + r) / 2.0) * (r - l)
                    break;
                case 2:
                    f = ((selectFun(l) + selectFun(r)) / 2.0) * (r - l)
                    break;
                case 3:
                    f = ((selectFun(l) + 4 * selectFun((l + r) / 2.0) + selectFun(r)) / 6.0) * (r - l)
                    break;
            }
            l += h
            r += h
            res += f
        }

        return res
    }

    const nesobst = (b, n) => {
        var i1 = funNesobst(b, n)
        var i2 = funNesobst(2 * b, n)
        var res = Math.abs(i2 - i1)
        if (countNesob.current < 20) {
            countNesob.current++;
            if (res > eps) {
                nesobst(b, 2 * n)
            } else {
                dispath({ type: "set_result", result: { result: i2, n: 2 * b } })
            }
        } else {
            count.current++;

            if (res > eps && count.current < 20) {
                countNesob.current = 0
                nesobst(2 * b, 1)
            } else if (count.current < 20) {
                countNesob.current = 0
                dispath({ type: "set_result", result: { result: i2, n: 2 * b } })
            } else {
                countNesob.current = 0
                dispath({ type: "set_result", result: { result: "Интеграл расходится" } })
            }
        }
    }

    return (
        <>
            <header className="header">
                <div className="header__content">
                    <p className="header__text">Квадратная формула: </p>
                    <select name="" id="" className="header__select" onChange={(e) => {
                        setSel(Number(e.target.value))
                        selectMethod(Number(e.target.value))
                    }}>
                        <option value="" disabled selected>Выбрать вариант</option>
                        <option value="1">Формула средних прямоугольников</option>
                        <option value="2">Формула трапеций</option>
                        <option value="3">Формула Симпсона</option>
                    </select>
                    <p className="header__text">для </p>
                    <select name="" id="" className="header__select" onChange={(e) => {
                        setInteg(Number(e.target.value))
                        selectMethod(sel)
                    }}>
                        <option value="1">определенного интеграла</option>
                        <option value="2"> несобственного интеграла</option>
                    </select>
                </div>
            </header>
            <main className="main">
                {sel != "" &&
                    <div className="main__content">
                        <h1 className="main__text">
                            {title}
                        </h1>
                        <div className="main__func">
                            <div className="main__item">
                                <input type="radio" name="func" className="main__item-input" defaultChecked value={1} onChange={(e) => {
                                    setNumFunc(Number(e.target.value))
                                    count.current = 0
                                }} />
                                <p className="main__item-text">sin x</p>
                            </div>
                            <div className="main__item">
                                <input type="radio" name="func" className="main__item-input" value={2} onChange={(e) => {
                                    setNumFunc(Number(e.target.value))
                                    count.current = 0
                                }} />
                                <p className="main__item-text">cos x</p>
                            </div>
                            <div className="main__item">
                                <input type="radio" name="func" className="main__item-input" value={3} onChange={(e) => {
                                    setNumFunc(Number(e.target.value))
                                    count.current = 0
                                }} />
                                <p className="main__item-text">x<sup>2</sup></p>
                            </div>
                            <div className="main__item">
                                <input type="radio" name="func" className="main__item-input" value={4} onChange={(e) => {
                                    setNumFunc(Number(e.target.value))
                                    count.current = 0
                                }} />
                                <p className="main__item-text">&#8730;x</p>
                            </div>
                            <div className="main__item">
                                <input type="radio" name="func" className="main__item-input" value={5} onChange={(e) => {
                                    setNumFunc(Number(e.target.value))
                                    count.current = 0
                                }} />
                                <p className="main__item-text">1/x<sup>2</sup></p>
                            </div>
                        </div>
                        <div className="main__wrap">
                            <div className="main__wrap-input">
                                <label htmlFor="eps">ε = </label>
                                <input type="text" className="main__eps" name="eps" required value={eps} onChange={(e) => {
                                    if (e.target.value.match(/^\d*(\.\d*)?$/))
                                        dispath({ type: "set_eps", eps: e.target.value })
                                    else
                                        e.target.value = ""
                                    count.current = 0
                                }} />
                            </div>
                            <div className="main__wrap-input">
                                <label htmlFor="a">a = </label>
                                <input type="text" className="main__eps" name="a" required value={a} onChange={(e) => {
                                    if (e.target.value != "-") {
                                        if (e.target.value.match(/^-?\d*(\.\d*)?$/) && a !== 0) {
                                            dispath({ type: "set_a", a: e.target.value })
                                        } else if (a === 0) {
                                            dispath({ type: "set_a", a: "" })
                                        }
                                    } else {
                                        dispath({ type: "set_a", a: e.target.value })
                                    }
                                    count.current = 0
                                }} />
                            </div>
                            <div className="main__wrap-input">
                                <label htmlFor="b">{integ == 1 ? "b" : "B"} = </label>
                                <input type="text" className="main__eps" name="b" required value={b} onChange={(e) => {
                                    if (e.target.value != "-") {
                                        if (e.target.value.match(/^-?\d*(\.\d*)?$/) && b !== 0) {
                                            dispath({ type: "set_b", b: e.target.value })
                                        } else {
                                            dispath({ type: "set_b", b: "" })
                                        }
                                    } else {
                                        dispath({ type: "set_b", b: e.target.value })
                                    }
                                    count.current = 0
                                }} />
                            </div>
                            <button className="main__start" onClick={() => {
                                dispath({ type: "set_a", a: parseFloat(a) })
                                start(1)
                            }}>Получить ответ</button>
                        </div>
                        {(result.result != "%" && result.result != "Ошибка" && result.result != "Интеграл расходится") &&
                            <>
                                <h2 className="main__text">
                                    {"Значение: " + result?.result}
                                </h2>
                                <h2 className="main__text">
                                    {integ == 1 &&
                                        "n = " + result?.n
                                    }
                                    {integ == 2 &&
                                        "B = " + result?.n
                                    }
                                </h2>
                            </>
                        }
                        {(result.result == "Ошибка" || result.result == "Интеграл расходится") &&
                            <h2 className="main__text">
                                {result?.result}
                            </h2>
                        }
                    </div>
                }
            </main >
        </>)
}

export default Main;