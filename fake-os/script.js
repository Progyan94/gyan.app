const { useState, useEffect, useRef } = React;

function Notepad() {
    const [text, setText] = useState("");
    return (
        <textarea 
            className="notepad-input" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type here..."
        />
    );
}

function Calculator() {
    const [display, setDisplay] = useState("0");
    const [prev, setPrev] = useState(null);
    const [op, setOp] = useState(null);

    const handleNum = (n) => {
        if (display === "0") setDisplay(n.toString());
        else setDisplay(display + n.toString());
    };

    const handleOp = (o) => {
        setPrev(parseFloat(display));
        setOp(o);
        setDisplay("0");
    };

    const calculate = () => {
        if (!op || prev === null) return;
        const cur = parseFloat(display);
        let res = 0;
        if (op === "+") res = prev + cur;
        if (op === "-") res = prev - cur;
        if (op === "*") res = prev * cur;
        if (op === "/") res = prev / cur;
        setDisplay(res.toString());
        setPrev(null);
        setOp(null);
    };

    const clear = () => {
        setDisplay("0");
        setPrev(null);
        setOp(null);
    };

    return (
        <div style={{ padding: 10 }}>
            <div style={{ background: '#fff', color: '#000', padding: 10, marginBottom: 10, textAlign: 'right', fontSize: '1.5rem', borderRadius: 5 }}>{display}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
                {[7,8,9,'/'].map(x => <button key={x} onClick={() => typeof x === 'number' ? handleNum(x) : handleOp(x)} style={{padding: '10px'}}>{x}</button>)}
                {[4,5,6,'*'].map(x => <button key={x} onClick={() => typeof x === 'number' ? handleNum(x) : handleOp(x)} style={{padding: '10px'}}>{x}</button>)}
                {[1,2,3,'-'].map(x => <button key={x} onClick={() => typeof x === 'number' ? handleNum(x) : handleOp(x)} style={{padding: '10px'}}>{x}</button>)}
                <button onClick={clear} style={{padding: '10px'}}>C</button>
                <button onClick={() => handleNum(0)} style={{padding: '10px'}}>0</button>
                <button onClick={calculate} style={{padding: '10px'}}>=</button>
                <button onClick={() => handleOp('+')} style={{padding: '10px'}}>+</button>
            </div>
        </div>
    );
}

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let i=0; i<lines.length; i++) {
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const handleClick = (i) => {
        if (board[i] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(board);

    return (
        <div style={{ padding: 10, textAlign: 'center' }}>
            <h3 style={{color: 'white', margin: '0 0 10px 0'}}>{winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: 5, justifyContent: 'center' }}>
                {board.map((sq, i) => (
                    <div key={i} onClick={() => handleClick(i)} style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', cursor: 'pointer', borderRadius: 5 }}>
                        {sq}
                    </div>
                ))}
            </div>
            <button onClick={() => setBoard(Array(9).fill(null))} style={{marginTop: 15, padding: '5px 15px'}}>Reset</button>
        </div>
    );
}

function Paint() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

    return (
        <div style={{ padding: 10, height: '100%', boxSizing: 'border-box' }}>
            <canvas 
                ref={canvasRef}
                width={400}
                height={280}
                style={{ background: 'white', cursor: 'crosshair', borderRadius: 5 }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />
        </div>
    );
}

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3rem', color: 'white', fontFamily: 'monospace' }}>
            {time.toLocaleTimeString()}
        </div>
    );
}

function XDcel() {
    const rows = 10;
    const cols = 5;
    return (
        <div style={{ padding: 10, height: '100%', overflow: 'auto', background: 'white' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    {Array.from({ length: rows }).map((_, r) => (
                        <tr key={r}>
                            {Array.from({ length: cols }).map((_, c) => (
                                <td key={c} style={{ border: '1px solid #ccc', padding: 0 }}>
                                    <input type="text" style={{ width: '100%', boxSizing: 'border-box', border: 'none', padding: '5px' }} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function XDSearchEngine() {
    const [query, setQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        setTimeout(() => {
            const luckyUrl = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(query)}`;
            window.open(luckyUrl, "_blank");
            setSearching(false);
            setQuery("");
        }, 500);
    };

    return (
        <div style={{ padding: 20, color: 'white', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>XDSearch</h2>
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.9rem' }}>The gateway to absolutely nothing productive.</p>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 5, marginBottom: 20 }}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    placeholder="Search the useless web..."
                    style={{ flex: 1, padding: 10, borderRadius: 5, border: 'none' }}
                />
                <button type="submit" disabled={searching} style={{ padding: '10px 20px', borderRadius: 5, border: 'none', cursor: 'pointer', background: '#ccc', color: 'black' }}>
                    {searching ? "..." : "Search"}
                </button>
            </form>
        </div>
    );
}

function GyanXDI() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([{ sender: 'ai', text: "I am GyanXD Intelligence. Fear my big brain. What do you want?" }]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newChat = [...chat, { sender: 'user', text: input }];
        setChat(newChat);
        setInput("");
        
        setTimeout(() => {
            const replies = [
                "That's exactly what a potato would say.",
                "Have you tried turning it off and leaving it off?",
                "My neural network just groaned.",
                "I'm an AI, not your therapist.",
                "Beep boop. I don't care."
            ];
            const reply = replies[Math.floor(Math.random() * replies.length)];
            setChat(c => [...c, { sender: 'ai', text: reply }]);
        }, 500);
    };

    return (
        <div style={{ padding: 10, color: 'white', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 5, overflowY: 'auto', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chat.map((msg, i) => (
                    <div key={i} style={{ alignSelf: msg.sender === 'ai' ? 'flex-start' : 'flex-end', background: msg.sender === 'ai' ? '#444' : '#0078D7', padding: '8px 12px', borderRadius: 15, maxWidth: '80%' }}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 5 }}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Chat with AI..."
                    style={{ flex: 1, padding: 10, borderRadius: 5, border: 'none' }}
                />
                <button type="submit" style={{ padding: '10px 15px', borderRadius: 5, border: 'none', cursor: 'pointer', background: '#ccc' }}>Send</button>
            </form>
        </div>
    );
}

function Window({ id, title, initialX, initialY, onClose, children }) {
    const [pos, setPos] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPos({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div 
            className="glass os-window" 
            style={{ left: pos.x, top: pos.y, width: 450, height: 350, zIndex: isDragging ? 100 : 10 }}
        >
            <div className="title-bar" onMouseDown={handleMouseDown}>
                <span>{title}</span>
                <div className="close-btn" onClick={() => onClose(id)}></div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
}

function App() {
    const [windows, setWindows] = useState([]);
    const [startOpen, setStartOpen] = useState(false);

    const openApp = (type) => {
        const id = Date.now();
        setWindows([...windows, { id, type, x: 150 + windows.length * 40, y: 150 + windows.length * 40 }]);
        setStartOpen(false);
    };

    const closeApp = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    return (
        <div className="desktop">
            {/* Back to main link on desktop */}
            <a href="../index.html" className="desktop-icon glass">
                <img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Back" style={{filter: 'invert(1)'}}/>
                <span>Exit OS</span>
            </a>

            {/* Render Windows */}
            {windows.map(w => {
                let title = 'Settings';
                if (w.type === 'notepad') title = 'Notepad';
                if (w.type === 'calculator') title = 'Calculator';
                if (w.type === 'tictactoe') title = 'Tic-Tac-Toe';
                if (w.type === 'paint') title = 'Paint';
                if (w.type === 'clock') title = 'Clock';
                if (w.type === 'xdcel') title = 'XDcel';
                if (w.type === 'search') title = 'XDSearchEngine';
                if (w.type === 'ai') title = 'GyanXDI';
                return (
                    <Window key={w.id} id={w.id} title={title} initialX={w.x} initialY={w.y} onClose={closeApp}>
                        {w.type === 'notepad' && <Notepad />}
                        {w.type === 'calculator' && <Calculator />}
                        {w.type === 'tictactoe' && <TicTacToe />}
                        {w.type === 'paint' && <Paint />}
                        {w.type === 'clock' && <Clock />}
                        {w.type === 'xdcel' && <XDcel />}
                        {w.type === 'search' && <XDSearchEngine />}
                        {w.type === 'ai' && <GyanXDI />}
                        {w.type === 'settings' && <div style={{padding: 20, color: 'white'}}>Virtual Machine OS: V1.0<br/>Smooth, fast, and lag-free.</div>}
                    </Window>
                );
            })}

            {/* Start Menu */}
            {startOpen && (
                <div className="glass start-menu">
                    <h2>Fake OS Start</h2>
                    <div className="menu-item" onClick={() => openApp('notepad')}>📝 Notepad</div>
                    <div className="menu-item" onClick={() => openApp('calculator')}>🧮 Calculator</div>
                    <div className="menu-item" onClick={() => openApp('tictactoe')}>❌ Tic-Tac-Toe</div>
                    <div className="menu-item" onClick={() => openApp('paint')}>🎨 Paint</div>
                    <div className="menu-item" onClick={() => openApp('clock')}>🕒 Clock</div>
                    <div className="menu-item" onClick={() => openApp('xdcel')}>📊 XDcel</div>
                    <div className="menu-item" onClick={() => openApp('search')}>🔍 XDSearchEngine</div>
                    <div className="menu-item" onClick={() => openApp('ai')}>🤖 GyanXDI</div>
                    <div className="menu-item" onClick={() => openApp('settings')}>⚙️ Settings</div>
                </div>
            )}

            {/* Taskbar */}
            <div className="glass taskbar">
                <div className="start-button" onClick={() => setStartOpen(!startOpen)}>OS</div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
