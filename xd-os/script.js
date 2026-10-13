const { useState, useEffect, useRef } = React;

function Notepad() {
    const [text, setText] = useState("");
    const [display, setDisplay] = useState("");

    // Troll 1: Intentional Input Delay
    const handleChange = (e) => {
        const val = e.target.value;
        setText(val);
        setTimeout(() => {
            setDisplay(val);
        }, 1000); // 1 full second delay before characters show
    };

    return (
        <textarea 
            className="notepad-input" 
            value={display} 
            onChange={handleChange} 
            placeholder="Type here to experience true speed..."
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
        // Troll: Sometimes give a totally wrong answer in XD OS
        if (Math.random() > 0.7) {
            res = "XD";
        }
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
        // Troll: Sometimes O goes twice, or places XD instead of X
        const mark = xIsNext ? (Math.random() > 0.8 ? 'XD' : 'X') : 'O';
        newBoard[i] = mark;
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

    const getTrollCoordinates = (e, canvas) => {
        const rect = canvas.getBoundingClientRect();
        // Troll: offset by a random amount, or fixed annoying offset
        const offsetX = 10 + Math.random() * 40;
        const offsetY = 10 + Math.random() * 40;
        return {
            x: e.clientX - rect.left + offsetX,
            y: e.clientY - rect.top + offsetY
        };
    };

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getTrollCoordinates(e, canvas);
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getTrollCoordinates(e, canvas);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();
        setIsDrawing(false);
    };

    return (
        <div style={{ padding: 10, width: '100%', height: '100%', boxSizing: 'border-box' }}>
            <canvas
                ref={canvasRef}
                width={430}
                height={290}
                style={{ background: 'white', cursor: 'crosshair', borderRadius: 5, display: 'block' }}
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
        let currentTime = Date.now();
        const interval = setInterval(() => {
            // Troll: run twice as fast, or randomly backwards
            if (Math.random() > 0.8) {
                currentTime -= 1000 * 60 * 60; // jump back an hour
            } else {
                currentTime += 2000; // twice as fast
            }
            setTime(new Date(currentTime));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '3rem', color: 'white', fontWeight: 'bold' }}>
            {time.toLocaleTimeString()}
        </div>
    );
}

function XDcel() {
    const [cells, setCells] = useState(Array(24).fill(""));

    const handleChange = (i, val) => {
        const newCells = [...cells];
        newCells[i] = val;
        setCells(newCells);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCells(prev => {
                const next = [...prev];
                const i = Math.floor(Math.random() * next.length);
                if (Math.random() > 0.5) {
                    next[i] = ""; // Delete content
                } else {
                    next[i] = Math.floor(Math.random() * 9999).toString(); // Change to random number
                }
                return next;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5, padding: 10, overflowY: 'auto', height: '100%', boxSizing: 'border-box' }}>
            {cells.map((c, i) => (
                <input 
                    key={i} 
                    value={c} 
                    onChange={e => handleChange(i, e.target.value)} 
                    style={{ padding: 5, border: 'none', borderRadius: 3, width: '100%', boxSizing: 'border-box' }}
                />
            ))}
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
            // Troll: Even with I'm feeling lucky, we occasionally append "for pigeons" to their query in XD OS
            const finalQuery = Math.random() > 0.5 ? query + " for pigeons" : query;
            const luckyUrl = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(finalQuery)}`;
            window.open(luckyUrl, "_blank");
            setSearching(false);
            setQuery("");
        }, 800);
    };

    return (
        <div style={{ padding: 20, color: 'white', height: '100%', overflowY: 'auto', boxSizing: 'border-box' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>XDSearch</h2>
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.9rem' }}>The gateway to absolutely nothing productive.</p>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 5, marginTop: 20 }}>
                <input 
                    style={{ flex: 1, padding: 10, borderRadius: 20, border: 'none' }} 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    placeholder="Search the useless web..." 
                />
                <button type="submit" disabled={searching} style={{ padding: '10px 20px', borderRadius: 20, border: 'none', cursor: 'pointer', background: '#0078D7', color: 'white' }}>
                    {searching ? "..." : "Search"}
                </button>
            </form>
        </div>
    );
}

function GyanXDI() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);

    const insults = [
        "That's the dumbest question I've ever heard.",
        "404: Your brain not found.",
        "I would answer that, but I respect myself too much.",
        "Error: User requires upgrading to continue.",
        "Bleeb bloop. You're a boop.",
        "I'm an AI, not your therapist."
    ];

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Troll: Sometimes delete the input instead of sending
        if (Math.random() > 0.7) {
            setInput("");
            return;
        }

        const msg = input;
        setChat(prev => [...prev, { role: 'user', text: msg }]);
        setInput("");
        setTyping(true);

        // Troll: 2 seconds delay
        setTimeout(() => {
            const reply = insults[Math.floor(Math.random() * insults.length)];
            setChat(prev => [...prev, { role: 'ai', text: reply }]);
            setTyping(false);
        }, 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 10, boxSizing: 'border-box' }}>
            <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: 5, padding: 10, marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chat.map((m, i) => (
                    <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left' }}>
                        <span style={{ 
                            background: m.role === 'user' ? '#0078D7' : '#444', 
                            color: 'white', 
                            padding: '8px 12px', 
                            borderRadius: 15,
                            display: 'inline-block',
                            maxWidth: '80%',
                            wordWrap: 'break-word'
                        }}>
                            {m.text}
                        </span>
                    </div>
                ))}
                {typing && <div style={{ color: '#aaa', fontSize: '0.8rem', fontStyle: 'italic' }}>GyanXDI is typing...</div>}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 5 }}>
                <input 
                    style={{ flex: 1, padding: 10, borderRadius: 20, border: 'none' }} 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Ask the almighty AI..." 
                />
                <button type="submit" style={{ padding: '10px 20px', borderRadius: 20, border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' }}>Send</button>
            </form>
        </div>
    );
}

function Window({ id, title, initialX, initialY, onClose, children }) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 500;
    const winWidth = isMobile ? Math.min(window.innerWidth - 20, 360) : 450;
    const winHeight = isMobile ? Math.min(window.innerHeight - 130, 380) : 350;
    const initX = isMobile ? 10 : Math.min(initialX, window.innerWidth - winWidth - 10);
    const initY = isMobile ? 20 : Math.min(initialY, window.innerHeight - winHeight - 70);

    const [pos, setPos] = useState({ x: Math.max(5, initX), y: Math.max(5, initY) });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    const handleStart = (e) => {
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragStart.current = { x: clientX - pos.x, y: clientY - pos.y };
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setPos({
            x: Math.max(0, Math.min(window.innerWidth - 60, clientX - dragStart.current.x)),
            y: Math.max(0, Math.min(window.innerHeight - 60, clientY - dragStart.current.y))
        });
    };

    const handleEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', handleEnd);
        } else {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    return (
        <div 
            className="glass os-window" 
            style={{ left: pos.x, top: pos.y, width: winWidth, height: winHeight, maxWidth: 'calc(100vw - 10px)', zIndex: isDragging ? 100 : 10 }}
        >
            <div className="title-bar" onMouseDown={handleStart} onTouchStart={handleStart}>
                <span>{title}</span>
                <div className="close-btn" onClick={() => onClose(id)}></div>
            </div>
            <div className="window-content" style={{ overflow: 'auto' }}>
                {children}
            </div>
        </div>
    );
}

function App() {
    const [windows, setWindows] = useState([]);
    const [startOpen, setStartOpen] = useState(false);
    const [glitching, setGlitching] = useState(false);
    const [trolls, setTrolls] = useState([]);

    const openApp = (type) => {
        const id = Date.now();
        const isMobile = window.innerWidth < 500;
        const initX = isMobile ? 10 : 150 + (windows.length % 5) * 40;
        const initY = isMobile ? 20 + (windows.length % 5) * 20 : 150 + (windows.length % 5) * 40;
        setWindows([...windows, { id, type, x: initX, y: initY }]);
        setStartOpen(false);
    };

    const closeApp = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    // Troll 2: Random CSS Glitches & Popups
    useEffect(() => {
        const interval = setInterval(() => {
            // 15% chance to glitch the whole screen
            if (Math.random() > 0.85) {
                setGlitching(true);
                setTimeout(() => setGlitching(false), 400); // Glitch for 400ms
            }
            
            // 10% chance to spawn a spinning troll face
            if (Math.random() > 0.90) {
                const newTroll = {
                    id: Date.now(),
                    x: Math.random() * (window.innerWidth - 300),
                    y: Math.random() * (window.innerHeight - 300)
                };
                setTrolls(t => [...t, newTroll]);
                // Remove troll after 2 seconds
                setTimeout(() => {
                    setTrolls(t => t.filter(tr => tr.id !== newTroll.id));
                }, 2000);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`desktop ${glitching ? 'glitch' : ''}`}>
            {/* Back to main link on desktop */}
            <a href="../index.html" className="desktop-icon glass">
                <img src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="Back" style={{filter: 'invert(1)'}}/>
                <span>Exit OS</span>
            </a>

            {/* Render Windows */}
            {windows.map(w => {
                let title = 'Settings';
                if (w.type === 'notepad') title = 'Notepad (Lag Edition)';
                if (w.type === 'calculator') title = 'Maths (XD)';
                if (w.type === 'tictactoe') title = 'Tic-Tac-Toe';
                if (w.type === 'paint') title = 'Paint (Drunk)';
                if (w.type === 'clock') title = 'Time is a Construct';
                if (w.type === 'xdcel') title = 'XDcel Spreadsheets';
                if (w.type === 'search') title = 'XDSearch Engine';
                if (w.type === 'ai') title = 'GyanXD Intelligence';
                
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
                        {w.type === 'settings' && <div style={{padding: 20, color: 'white'}}>Settings cannot be changed. Accept your fate.</div>}
                    </Window>
                );
            })}

            {/* Render Troll Faces */}
            {trolls.map(t => (
                <div key={t.id} className="troll-face" style={{ left: t.x, top: t.y }}></div>
            ))}

            {/* Start Menu */}
            {startOpen && (
                <div className="glass start-menu">
                    <h2>XD OS Start</h2>
                    <div className="menu-item" onClick={() => openApp('notepad')}>📝 Notepad</div>
                    <div className="menu-item" onClick={() => openApp('calculator')}>🧮 Calculator</div>
                    <div className="menu-item" onClick={() => openApp('tictactoe')}>❌ Tic-Tac-Toe</div>
                    <div className="menu-item" onClick={() => openApp('paint')}>🎨 Paint</div>
                    <div className="menu-item" onClick={() => openApp('clock')}>🕒 Clock</div>
                    <div className="menu-item" onClick={() => openApp('xdcel')}>📊 XDcel</div>
                    <div className="menu-item" onClick={() => openApp('search')}>🔍 XDSearch</div>
                    <div className="menu-item" onClick={() => openApp('ai')}>🤖 GyanXDI</div>
                    <div className="menu-item" onClick={() => openApp('settings')}>⚙️ Settings</div>
                </div>
            )}

            {/* Taskbar */}
            <div className="glass taskbar">
                <div className="start-button" onClick={() => setStartOpen(!startOpen)}>XD</div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
