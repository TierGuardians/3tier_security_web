import React, { useState } from "react";
import axios from "axios";

function ExpensePage() {
    const [expenses, setExpenses] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showExpenses, setShowExpenses] = useState(false);
    const [newExpense, setNewExpense] = useState({
        category: "",
        description: "",
        amount: 0,
        spentAt: ""
    });

    const categoryTypes = [
        "월세/관리비", "통신비", "보험료",
        "식비", "교통비", "쇼핑",
        "의료/약", "문화/여가", "구독서비스"
    ];

    const userId = localStorage.getItem('userId');

    const toggleExpenses = () => {
        if (!showExpenses) {
            axios.get(`http://192.168.0.83:8081/expenses?userId=${userId}`)
                .then(res => {
                    setExpenses(res.data.data);
                    setIsEditMode(false);
                    setShowExpenses(true);
                })
                .catch(err => console.error("소비 내역 조회 실패:", err));
        } else {
            setShowExpenses(false);
            setIsEditMode(false);
        }
    };

    const enableEditMode = () => setIsEditMode(true);

    const handleExpenseChange = (index, field, value) => {
        const updated = [...expenses];
        updated[index][field] = field === 'amount' ? Number(value) : value;
        setExpenses(updated);
    };

    const saveExpenseChanges = (id, expense) => {
        axios.put(`http://192.168.0.83:8081/expenses/${id}`, {
            category: expense.category,
            description: expense.description,
            amount: expense.amount,
            spentAt: expense.spentAt
        }).then(() => {
            alert("수정 완료");
            toggleExpenses();
        }).catch(err => console.error("수정 실패:", err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://192.168.0.83:8081/expenses/${id}`)
            .then(() => {
                alert("삭제 완료");
                toggleExpenses();
            }).catch(err => console.error("삭제 실패:", err));
    };

    const addExpense = () => {
        axios.post('http://192.168.0.83:8081/expenses', {
            ...newExpense,
            userId
        }).then(() => {
            alert("소비 내역 추가 완료");
            setNewExpense({ category: "", description: "", amount: 0, spentAt: "" });
            toggleExpenses();
        }).catch(err => console.error("추가 실패:", err));
    };

    return (
        <div className="container mt-5">
            <h2>소비 내역 관리</h2>

            <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={toggleExpenses}>
                    {showExpenses ? "소비 내역 숨기기" : "소비 내역 조회"}
                </button>
                {showExpenses && !isEditMode &&
                    <button className="btn btn-secondary" onClick={enableEditMode}>소비 내역 수정</button>
                }
            </div>

            {showExpenses &&
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>카테고리</th>
                                <th>설명</th>
                                <th>금액</th>
                                <th>사용일</th>
                                {isEditMode && <th>동작</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, idx) => (
                                <tr key={expense.id}>
                                    {/* ✅ 카테고리 */}
                                    <td>
                                        <select
                                            className="form-select"
                                            value={expense.category}
                                            onChange={e => handleExpenseChange(idx, 'category', e.target.value)}
                                        >
                                            <option value="">-- 카테고리 선택 --</option>
                                            {categoryTypes.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </td>

                                    {/* ✅ 설명 */}
                                    <td>
                                        <input
                                            value={expense.description}
                                            onChange={e => handleExpenseChange(idx, 'description', e.target.value)}
                                            className="form-control"
                                        />
                                    </td>

                                    {/* ✅ 금액 */}
                                    <td>
                                        <input
                                            type="number"
                                            value={expense.amount}
                                            onChange={e => handleExpenseChange(idx, 'amount', e.target.value)}
                                            className="form-control"
                                        />
                                    </td>

                                    {/* ✅ 사용일 */}
                                    <td>
                                        <input
                                            type="date"
                                            value={expense.spentAt}
                                            onChange={e => handleExpenseChange(idx, 'spentAt', e.target.value)}
                                            className="form-control"
                                        />
                                    </td>

                                    {/* ✅ 동작 버튼 */}
                                    {isEditMode &&
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-success" onClick={() => saveExpenseChanges(expense.id, expense)}>저장</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(expense.id)}>삭제</button>
                                            </div>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {isEditMode &&
                        <div className="mt-4">
                            <h4>신규 소비 추가</h4>

                            <div className="mb-2">
                                <label className="form-label">카테고리 (선택 또는 직접 입력)</label>
                                <div className="d-flex gap-2">
                                    <select
                                        className="form-select"
                                        value={categoryTypes.includes(newExpense.category) ? newExpense.category : ""}
                                        onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                                    >
                                        <option value="">-- 소비 카테고리 선택 --</option>
                                        {categoryTypes.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="직접 입력"
                                        value={newExpense.category}
                                        onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                                    />
                                </div>
                            </div>

                            <input
                                className="form-control mb-2"
                                placeholder="설명"
                                value={newExpense.description}
                                onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                            />
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="금액"
                                value={newExpense.amount === 0 ? "" : newExpense.amount}
                                onFocus={() => {
                                    if (newExpense.amount === 0) {
                                        setNewExpense({ ...newExpense, amount: "" });
                                    }
                                }}
                                onChange={e => {
                                    const val = e.target.value;
                                    setNewExpense({ ...newExpense, amount: val === "" ? 0 : Number(val) });
                                }}
                            />
                            <input
                                type="date"
                                className="form-control mb-2"
                                placeholder="사용일"
                                value={newExpense.spentAt}
                                onChange={e => setNewExpense({ ...newExpense, spentAt: e.target.value })}
                            />
                            <button className="btn btn-primary" onClick={addExpense}>소비 추가</button>
                        </div>
                    }
                </>
            }
        </div>
    );
}

export default ExpensePage;