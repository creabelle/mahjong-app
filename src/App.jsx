import { useState, useEffect } from "react";

function FontLoader() {
  useEffect(() => {
    const el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&display=swap";
    document.head.appendChild(el);
  }, []);
  return null;
}

const C = {
  bg:"#daeef8", bgLight:"#eaf6fc", bgMid:"#c5e4f0", card:"#ffffff",
  cardBorder:"#b8d8ea", ink:"#1a2c3d", inkMid:"#2d4a60", inkLight:"#5a7a90",
  gold:"#b8860b", goldLight:"#d4a820", goldPale:"#fdf0c0",
  safe:"#15803d", safePale:"#dcfce7", danger:"#dc2626", dangerPale:"#fee2e2",
  warn:"#d97706", warnPale:"#fef3c7", blue:"#1d6fa8", bluePale:"#dbeafe",
};

const KANJI = ["一","二","三","四","五","六","七","八","九"];

function ManContent({ num, W, H }) {
  const numColor = num === 5 ? "#cc1111" : "#1a1209";
  const wanColor = "#cc1111";
  return (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", userSelect:"none" }}>
      <div style={{ fontSize: W*0.48, lineHeight:1, fontWeight:900, color:numColor,
        fontFamily:"'Noto Serif JP','HiraMinProN-W6','MS Mincho','游明朝','源ノ明朝',serif",
        letterSpacing:"-0.02em" }}>{KANJI[num-1]}</div>
      <div style={{ fontSize:W*0.26, lineHeight:1.1, fontWeight:700, color:wanColor,
        fontFamily:"'Noto Serif JP',serif", marginTop:H*0.01 }}>萬</div>
    </div>
  );
}

function SouContent({ num, W, H }) {
  const isRed=num===5, col=isRed?"#cc1111":"#166534", colDark=isRed?"#991b1b":"#14532d",
    colHi=isRed?"rgba(255,180,180,0.5)":"rgba(134,239,172,0.5)";
  if(num===1){
    const cx=W/2,cy=H/2;
    const petalAngles=[0,30,60,90,120,150,180,210,240,270,300,330];
    return(<svg viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}>
      {petalAngles.map(a=>{const r=a*Math.PI/180,px=cx+Math.cos(r)*W*0.24,py=cy+Math.sin(r)*H*0.22;
        return<ellipse key={a} cx={px} cy={py} rx={W*0.075} ry={H*0.055} transform={`rotate(${a},${px},${py})`} fill="#166534"/>;})}
      {[15,75,135,195,255,315].map(a=>{const r=a*Math.PI/180,px=cx+Math.cos(r)*W*0.135,py=cy+Math.sin(r)*H*0.13;
        return<ellipse key={`i${a}`} cx={px} cy={py} rx={W*0.055} ry={H*0.042} transform={`rotate(${a},${px},${py})`} fill="#16a34a"/>;})}
      <circle cx={cx} cy={cy} r={W*0.11} fill="#dc2626"/>
      <circle cx={cx} cy={cy} r={W*0.055} fill="#fef08a"/>
    </svg>);
  }
  const pin=(key,cx,cy,bw,bh)=>{
    const capRx=bw*0.46,capRy=bh*0.22,bodyW=bw*0.62,bodyTop=cy-bh*0.28,bodyBot=cy+bh*0.50;
    return(<g key={key}>
      <rect x={cx-bodyW/2} y={bodyTop} width={bodyW} height={bodyBot-bodyTop} rx={bodyW*0.25} fill={col}/>
      <ellipse cx={cx} cy={bodyTop} rx={capRx} ry={capRy} fill={col}/>
      <rect x={cx-bodyW/2-1} y={cy-bh*0.02} width={bodyW+2} height={bh*0.09} rx={2} fill={colDark} opacity={0.6}/>
      <ellipse cx={cx-capRx*0.28} cy={bodyTop-capRy*0.3} rx={capRx*0.35} ry={capRy*0.40} fill={colHi}/>
    </g>);
  };
  const margin=W*0.08,usableW=W-margin*2,usableH=H-margin*2;
  const layouts={
    2:{grid:[[0,0],[0,1]],cols:1,rows:2},
    3:{grid:[[0,0],[0,1],[0,2]],cols:1,rows:3},
    4:{grid:[[0,0],[1,0],[0,1],[1,1]],cols:2,rows:2},
    5:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2]],cols:2,rows:3},
    6:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]],cols:2,rows:3},
    7:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3]],cols:2,rows:4},
    8:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0,3],[1,3]],cols:2,rows:4},
    9:{grid:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]],cols:3,rows:3}
  };
  const lay=layouts[num];if(!lay)return null;
  const cols=lay.cols,rows=lay.rows,pinW=usableW/cols*0.78,pinH=usableH/rows*0.82,cellW=usableW/cols,cellH=usableH/rows;
  return(<svg viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}>
    {lay.grid.map(([c,r],i)=>{const cx=margin+c*cellW+cellW/2,cy=margin+r*cellH+cellH/2;return pin(i,cx,cy,pinW,pinH);})}
  </svg>);
}

function PinContent({ num, W, H }) {
  const isRed=num===5,outer=isRed?"#cc1111":"#1e3a8a",inner=isRed?"#ef4444":"#2563eb",center=isRed?"#fca5a5":"#bfdbfe";
  const circle=(key,cx,cy,r)=>(<g key={key}>
    <circle cx={cx} cy={cy} r={r} fill={outer}/>
    <circle cx={cx} cy={cy} r={r*0.72} fill="#ffffff"/>
    <circle cx={cx} cy={cy} r={r*0.52} fill={inner}/>
    <circle cx={cx} cy={cy} r={r*0.18} fill={center}/>
    <circle cx={cx-r*0.22} cy={cy-r*0.22} r={r*0.14} fill="rgba(255,255,255,0.55)"/>
  </g>);
  const margin=W*0.08,usableW=W-margin*2,usableH=H-margin*2;
  const layouts={
    1:{grid:[[0.5,0.5]],cols:1,rows:1},2:{grid:[[0.5,0],[0.5,1]],cols:1,rows:2},
    3:{grid:[[0.5,0],[0,1],[1,1]],cols:2,rows:2},4:{grid:[[0,0],[1,0],[0,1],[1,1]],cols:2,rows:2},
    5:{grid:[[0,0],[1,0],[0.5,1],[0,2],[1,2]],cols:2,rows:3},6:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2]],cols:2,rows:3},
    7:{grid:[[0,0],[1,0],[0,1],[1,1],[0,2],[1,2],[0.5,3]],cols:2,rows:4},
    8:{grid:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[2,2]],cols:3,rows:3},
    9:{grid:[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]],cols:3,rows:3}
  };
  const lay=layouts[num];if(!lay)return null;
  if(num===1){const r=Math.min(usableW,usableH)*0.36;return(<svg viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}>{circle(0,W/2,H/2,r)}</svg>);}
  const cellW=usableW/lay.cols,cellH=usableH/lay.rows,r=Math.min(cellW,cellH)*0.38;
  return(<svg viewBox={`0 0 ${W} ${H}`} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}>
    {lay.grid.map(([c,r2],i)=>{const pcx=margin+c*cellW+cellW/2,pcy=margin+r2*cellH+cellH/2;return circle(i,pcx,pcy,r);})}
  </svg>);
}

function Tile({ num, suit="man", state="normal", size="md", label, onClick }) {
  const W={sm:36,md:50,lg:66}[size]||50, H=Math.round(W*1.40);
  const borderCol={normal:"#b89030",discard:"#8aa0b0",grey:"#8aa0b0",safe:"#15803d",danger:"#dc2626",warn:"#d97706",highlight:"#b89030"}[state]||"#b89030";
  const borderW=(state==="normal"||state==="discard"||state==="grey")?1.5:2.5;
  const glow={safe:"0 0 9px rgba(21,128,61,0.5)",danger:"0 0 9px rgba(220,38,38,0.5)",warn:"0 0 9px rgba(217,119,6,0.5)",highlight:"0 0 7px rgba(184,144,48,0.4)"}[state]||"";
  const isDiscard=state==="discard"||state==="grey";
  const tileBg=isDiscard?"linear-gradient(165deg,#dce4e8 0%,#c4cfd4 100%)":"linear-gradient(165deg,#fefefe 0%,#faf4e4 60%,#f2e6cc 100%)";
  const shadow=["inset 0 1px 3px rgba(255,255,255,0.88)","inset 0 -1px 2px rgba(0,0,0,0.09)",`3px 4px 0 ${isDiscard?"#7890a0":"#9a7010"}`,"4px 6px 9px rgba(0,0,0,0.26)",glow].filter(Boolean).join(", ");
  return(<div style={{position:"relative",display:"inline-block",flexShrink:0,cursor:onClick?"pointer":"default"}} onClick={onClick}>
    {label&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",fontSize:8,background:borderCol,color:"#fff",padding:"1px 5px",borderRadius:3,whiteSpace:"nowrap",zIndex:3,fontWeight:700}}>{label}</div>}
    <div style={{width:W,height:H,background:tileBg,border:`${borderW}px solid ${borderCol}`,borderRadius:5,boxShadow:shadow,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:3,border:"0.8px solid rgba(100,70,10,0.16)",borderRadius:3,pointerEvents:"none",zIndex:2}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:"38%",background:"linear-gradient(to bottom,rgba(255,255,255,0.40),rgba(255,255,255,0))",borderRadius:"5px 5px 0 0",pointerEvents:"none",zIndex:2}}/>
      {suit==="man"&&<ManContent num={num} W={W} H={H}/>}
      {suit==="sou"&&<SouContent num={num} W={W} H={H}/>}
      {suit==="pin"&&<PinContent num={num} W={W} H={H}/>}
    </div>
  </div>);
}

function TileRow({children,gap=6}){return<div style={{display:"flex",gap,alignItems:"flex-end",flexWrap:"wrap"}}>{children}</div>;}
function Card({title,icon,children,accent=C.gold}){return(<div style={{background:C.card,border:`1px solid ${C.cardBorder}`,borderLeft:`3px solid ${accent}`,borderRadius:10,padding:"15px 18px",marginBottom:14,boxShadow:"0 2px 8px rgba(0,80,120,0.07)"}}>{title&&<div style={{color:accent,fontWeight:700,fontSize:14,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{icon&&<span>{icon}</span>}{title}</div>}{children}</div>);}
function Badge({color,children}){return<span style={{display:"inline-block",background:color+"18",color,border:`1px solid ${color}44`,borderRadius:12,padding:"2px 10px",fontSize:11,fontWeight:700}}>{children}</span>;}
function Pill({color,children}){return<span style={{display:"inline-block",background:color,color:"#fff",borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:700}}>{children}</span>;}

function SujiBasics() {
  const [activeExample, setActiveExample] = useState(null);
  return (
    <div>
      <Card title="筋（スジ）とは？" icon="🎯" accent={C.gold}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          <strong>筋牌</strong>とは、ある牌を捨てた場合に「その牌がシュンツの両端になれば、反対側の端の牌は安全」という論理に基づく守備の読みです。
        </p>
        <div style={{background:C.goldPale,borderRadius:8,padding:"12px 16px",marginBottom:12}}>
          <div style={{fontWeight:700,color:C.gold,fontSize:13,marginBottom:8}}>📐 3セットの筋</div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {[[1,4,7],[2,5,8],[3,6,9]].map(([a,b,c])=>(
              <div key={a} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{fontSize:11,color:C.inkLight,fontWeight:600}}>
                  {a}-{b} / {b}-{c} セット
                </div>
                <TileRow gap={4}>
                  <Tile num={a} suit="man" size="sm" state="discard"/>
                  <Tile num={b} suit="man" size="sm" state="safe"/>
                  <Tile num={c} suit="man" size="sm" state="discard"/>
                </TileRow>
              </div>
            ))}
          </div>
        </div>
        <Card title="フリテン規定と筋" icon="⚠️" accent={C.warn}>
          <p style={{color:C.ink,fontSize:13,lineHeight:1.6}}>
            相手が<strong>両面待ちでリーチしている場合</strong>、捨て牌に筋の一方があれば、もう一方は安全。
            ただし、<strong>カンチャン・ペンチャン・シャンポン待ち</strong>には筋が効かないことに注意。
          </p>
          <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
            <Badge color={C.safe}>両面待ち→筋有効</Badge>
            <Badge color={C.danger}>カンチャン→筋無効</Badge>
            <Badge color={C.warn}>ペンチャン→筋無効</Badge>
          </div>
        </Card>
      </Card>

      <Card title="中筋とは" icon="🔰" accent={C.blue}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          捨て牌から推測される両面のうち、<strong>どちらの筋にも該当する牌</strong>を「中筋」と呼びます。
          例えば捨て牌に「3」と「7」があれば「6」は3セット・7セットの両方の筋になります。
        </p>
        <div style={{background:C.bluePale,borderRadius:8,padding:"12px 16px"}}>
          <div style={{fontWeight:700,color:C.blue,fontSize:13,marginBottom:8}}>例：捨て牌に3と7がある場合の6</div>
          <TileRow gap={6}>
            <Tile num={3} suit="man" size="sm" state="discard" label="捨て牌"/>
            <span style={{color:C.inkLight,fontSize:12,alignSelf:"center"}}>の筋→</span>
            <Tile num={6} suit="man" size="md" state="safe" label="安全(中筋)"/>
            <span style={{color:C.inkLight,fontSize:12,alignSelf:"center"}}>←の筋</span>
            <Tile num={7} suit="man" size="sm" state="discard" label="捨て牌"/>
          </TileRow>
        </div>
      </Card>

      <Card title="筋の限界" icon="❌" accent={C.danger}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          筋は<strong>両面待ちリーチ</strong>に対してのみ有効です。以下の場合は筋牌でも危険です。
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {label:"カンチャン待ち",desc:"例：4-6待ちで5を捨てても、5は「筋」でない",danger:true},
            {label:"筋引っかけ",desc:"例：3を捨てて3-6待ち → 6は「筋牌」だが当たり牌",danger:true},
            {label:"多面待ち",desc:"複数の待ちがある場合、筋の計算が複雑になる",danger:true},
          ].map(({label,desc,danger})=>(
            <div key={label} style={{background:danger?C.dangerPale:C.safePale,borderRadius:6,padding:"10px 14px",borderLeft:`3px solid ${danger?C.danger:C.safe}`}}>
              <div style={{fontWeight:700,color:danger?C.danger:C.safe,fontSize:13,marginBottom:4}}>{label}</div>
              <div style={{color:C.ink,fontSize:12,lineHeight:1.5}}>{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KabeSection() {
  const [wallTiles, setWallTiles] = useState([]);
  const toggleWall = (n) => setWallTiles(prev => prev.includes(n) ? prev.filter(x=>x!==n) : [...prev,n]);
  const isNochan = (n) => wallTiles.filter(t=>t===n).length >= 3;
  const isWanchan = (n) => wallTiles.filter(t=>t===n).length >= 2;

  return (
    <div>
      <Card title="壁（カベ）とは？" icon="🧱" accent={C.blue}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          ある数牌が<strong>4枚すべて見えている</strong>（自分の手牌＋捨て牌）場合、その牌を使ったシュンツは成立しないため、
          隣接する牌の待ちが限定されます。これを「壁」と呼びます。
        </p>
        <Card title="壁チェッカー（インタラクティブ）" icon="🔍" accent={C.gold}>
          <p style={{color:C.inkLight,fontSize:12,marginBottom:10}}>見えている牌をクリックして選択してください（同じ牌を複数選べます）</p>
          <div style={{marginBottom:12}}>
            <TileRow gap={4}>
              {[1,2,3,4,5,6,7,8,9].map(n=>(
                <div key={n} style={{position:"relative"}}>
                  <Tile num={n} suit="man" size="sm"
                    state={isNochan(n)?"safe":isWanchan(n)?"warn":"normal"}
                    onClick={()=>toggleWall(n)}/>
                  {wallTiles.filter(t=>t===n).length>0&&(
                    <span style={{position:"absolute",top:-8,right:-4,background:C.danger,color:"#fff",borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>
                      {wallTiles.filter(t=>t===n).length}
                    </span>
                  )}
                </div>
              ))}
            </TileRow>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[1,2,3,4,5,6,7,8,9].map(n=>{
              const count=wallTiles.filter(t=>t===n).length;
              if(count===0)return null;
              return(
                <div key={n} style={{background:count>=3?C.safePale:count>=2?C.warnPale:C.bluePale,borderRadius:6,padding:"6px 10px",fontSize:12,color:count>=3?C.safe:count>=2?C.warn:C.blue}}>
                  <strong>{n}萬</strong>: {count}枚見え → {count>=3?"ノーチャンス":count>=2?"ワンチャンス":"通常"}
                </div>
              );
            })}
          </div>
          <button onClick={()=>setWallTiles([])} style={{marginTop:10,padding:"4px 12px",background:C.inkLight,color:"#fff",border:"none",borderRadius:4,fontSize:12,cursor:"pointer"}}>リセット</button>
        </Card>
      </Card>

      <Card title="ノーチャンス" icon="🛡️" accent={C.safe}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          ある牌が<strong>3枚見えている</strong>場合、残り1枚はどこかにあるが、その牌を両端とする両面待ちは成立しない（山に残り1枚しかないため）。
          これが「ノーチャンス」で、隣の牌の<strong>両面危険度が下がります</strong>。
        </p>
        <div style={{background:C.safePale,borderRadius:8,padding:"12px 16px"}}>
          <div style={{fontWeight:700,color:C.safe,fontSize:13,marginBottom:8}}>例：4萬が3枚見えている場合</div>
          <TileRow gap={6}>
            <Tile num={3} suit="man" size="sm" state="normal"/>
            <Tile num={4} suit="man" size="md" state="safe" label="3枚見え"/>
            <Tile num={5} suit="man" size="sm" state="normal"/>
          </TileRow>
          <p style={{color:C.safe,fontSize:12,marginTop:8}}>→ 3萬・5萬への両面待ちリスクが大幅に減少</p>
        </div>
      </Card>

      <Card title="ワンチャンス" icon="⚡" accent={C.warn}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          ある牌が<strong>2枚見えている</strong>場合、残り2枚で両面が成立する可能性は低くなります。これを「ワンチャンス」と呼びます。
        </p>
        <div style={{background:C.warnPale,borderRadius:8,padding:"12px 16px"}}>
          <div style={{fontWeight:700,color:C.warn,fontSize:13,marginBottom:8}}>ワンチャンスの信頼度</div>
          <p style={{color:C.ink,fontSize:12,lineHeight:1.6}}>
            2枚見えでも残り2枚がある。確率は下がるが、絶対安全ではない。<br/>
            <strong>3枚見え（ノーチャンス）と組み合わせる</strong>とより精度が上がります。
          </p>
        </div>
      </Card>
    </div>
  );
}

function CombinedSection() {
  return (
    <div>
      <Card title="3と7の危険性" icon="⚠️" accent={C.danger}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          3と7は<strong>最も多くの待ちパターンに絡む牌</strong>です。
          両面・カンチャン・ペンチャンのすべての待ちタイプで中心になります。
        </p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:12}}>
          <div style={{flex:1,minWidth:140,background:C.dangerPale,borderRadius:8,padding:"12px"}}>
            <div style={{fontWeight:700,color:C.danger,fontSize:13,marginBottom:8}}>3萬の危険な待ち</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[["両面","1-2待ち"],["両面","2-4待ち"],["カンチャン","2-4待ち"],["ペンチャン","1-2待ち"]].map(([type,wait],i)=>(
                <div key={i} style={{display:"flex",gap:6,alignItems:"center"}}>
                  <Badge color={type==="両面"?C.danger:type==="カンチャン"?C.warn:C.blue}>{type}</Badge>
                  <span style={{fontSize:12,color:C.ink}}>{wait}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{flex:1,minWidth:140,background:C.dangerPale,borderRadius:8,padding:"12px"}}>
            <div style={{fontWeight:700,color:C.danger,fontSize:13,marginBottom:8}}>7萬の危険な待ち</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {[["両面","6-8待ち"],["両面","5-6待ち"],["カンチャン","6-8待ち"],["ペンチャン","8-9待ち"]].map(([type,wait],i)=>(
                <div key={i} style={{display:"flex",gap:6,alignItems:"center"}}>
                  <Badge color={type==="両面"?C.danger:type==="カンチャン"?C.warn:C.blue}>{type}</Badge>
                  <span style={{fontSize:12,color:C.ink}}>{wait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card title="序盤は外側から" icon="🎲" accent={C.blue}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          序盤は1・9・字牌など<strong>端の牌から捨てることが多い</strong>ため、
          序盤に捨てられた端の牌の筋（4・6など）は比較的安全な傾向があります。
          ただし中盤以降は内側の牌も捨てられるため注意が必要です。
        </p>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[{num:1,label:"序盤多い",safe:true},{num:9,label:"序盤多い",safe:true},{num:4,label:"比較的安全",safe:true},{num:6,label:"比較的安全",safe:true},{num:5,label:"中盤以降注意",safe:false}].map(({num,label,safe})=>(
            <div key={num} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <Tile num={num} suit="man" size="sm" state={safe?"safe":"warn"}/>
              <span style={{fontSize:9,color:safe?C.safe:C.warn,fontWeight:600}}>{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RealBattleSection() {
  return (
    <div>
      <Card title="安牌切りリーチへの対応" icon="🔒" accent={C.safe}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          リーチ後に安牌のみを切り続けるのは基本ですが、<strong>安牌が尽きた場合の優先順位</strong>を理解しておく必要があります。
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {pri:"①",label:"現物（ロン和了できない牌）",color:C.safe},
            {pri:"②",label:"筋牌（捨て牌から読める安全牌）",color:C.safe},
            {pri:"③",label:"字牌・端牌（1・9・字牌）",color:C.warn},
            {pri:"④",label:"壁牌（ノーチャンス・ワンチャンス）",color:C.warn},
            {pri:"⑤",label:"中筋・不安牌",color:C.danger},
          ].map(({pri,label,color})=>(
            <div key={pri} style={{display:"flex",gap:10,alignItems:"center",padding:"8px 12px",background:color+"11",borderRadius:6,borderLeft:`3px solid ${color}`}}>
              <span style={{fontWeight:700,color,fontSize:16}}>{pri}</span>
              <span style={{color:C.ink,fontSize:13}}>{label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card title="赤五切りリーチへの警戒" icon="🔴" accent={C.danger}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          赤五が捨て牌に出た場合、その五は<strong>不要牌として捨てられた可能性が高い</strong>ため、
          通常の五とは異なる待ちパターンを考える必要があります。
        </p>
        <div style={{background:C.dangerPale,borderRadius:8,padding:"12px"}}>
          <TileRow gap={6}>
            <Tile num={5} suit="man" size="sm" state="discard" label="赤5捨て"/>
          </TileRow>
          <p style={{color:C.danger,fontSize:12,marginTop:8}}>
            → 5を含まない待ちを想定。6-7や3-4の両面、シャンポン等に注意
          </p>
        </div>
      </Card>

      <Card title="筋引っかけ" icon="🪝" accent={C.warn}>
        <p style={{color:C.ink,fontSize:14,lineHeight:1.7,marginBottom:12}}>
          例えば捨て牌に「3」があれば「6」は3の筋で安全に見えますが、
          <strong>3-6の両面待ち</strong>で6が当たり牌になることがあります。これが「筋引っかけ」です。
        </p>
        <div style={{background:C.warnPale,borderRadius:8,padding:"12px"}}>
          <div style={{fontWeight:700,color:C.warn,fontSize:13,marginBottom:8}}>筋引っかけの例</div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <Tile num={3} suit="man" size="sm" state="discard" label="捨て牌"/>
            <span style={{color:C.inkLight,fontSize:12}}>→ 6は筋に見えるが…</span>
            <Tile num={6} suit="man" size="md" state="danger" label="当たり牌!"/>
          </div>
          <p style={{color:C.warn,fontSize:12,marginTop:8}}>3-6待ちの場合、6は「筋引っかけ」になる</p>
        </div>
      </Card>
    </div>
  );
}

function DefensePriority() {
  const priorities = [
    {level:"S",label:"現物",desc:"ロン和了ができない牌。完全安全。",color:C.safe,tiles:[{n:3,s:"safe"}]},
    {level:"A",label:"字牌・端牌",desc:"字牌・1・9は待ちの種類が少なく比較的安全。",color:C.blue,tiles:[{n:1,s:"warn"},{n:9,s:"warn"}]},
    {level:"B",label:"筋牌",desc:"捨て牌の筋。両面待ちには有効だが引っかけに注意。",color:C.warn,tiles:[{n:6,s:"warn"}]},
    {level:"C",label:"壁牌・ワンチャンス",desc:"壁やワンチャンス。確率的に安全度が上がる。",color:C.warn,tiles:[]},
    {level:"D",label:"無筋中張牌",desc:"2〜8の筋が取れない牌。最も危険。",color:C.danger,tiles:[{n:5,s:"danger"}]},
  ];
  return (
    <div>
      <Card title="4段階の守備優先順位" icon="🏅" accent={C.gold}>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {priorities.map(({level,label,desc,color,tiles})=>(
            <div key={level} style={{display:"flex",gap:12,alignItems:"center",padding:"12px",background:color+"11",borderRadius:8,borderLeft:`4px solid ${color}`}}>
              <div style={{width:32,height:32,background:color,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:16,flexShrink:0}}>{level}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color,fontSize:14,marginBottom:2}}>{label}</div>
                <div style={{color:C.inkMid,fontSize:12,lineHeight:1.5}}>{desc}</div>
              </div>
              {tiles.length>0&&<TileRow gap={4}>{tiles.map(({n,s},i)=><Tile key={i} num={n} suit="man" size="sm" state={s}/>)}</TileRow>}
            </div>
          ))}
        </div>
      </Card>
      <Card title="中級者チェックリスト" icon="✅" accent={C.blue}>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {["相手のリーチ後、まず現物を確認している","筋を計算して安全牌の優先度を決めている","字牌・端牌を序盤にためらわず切れる","ノーチャンス・ワンチャンスを活用している","筋引っかけを意識して無筋中張牌を避けている","守備と攻撃のバランスを局面で判断している"].map((item,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"8px 10px",background:C.bgLight,borderRadius:6}}>
              <span style={{color:C.safe,fontSize:16,flexShrink:0}}>□</span>
              <span style={{color:C.ink,fontSize:13,lineHeight:1.5}}>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

const QUIZ_DATA = [
  {q:"リーチ後の捨て牌に「3萬」がありました。次のうち最も安全な牌はどれ？",
   opts:["2萬","4萬","6萬","5萬"],ans:2,
   exp:"3の筋は6です。両面待ちに対して6萬は安全（筋引っかけに注意）。"},
  {q:"「ノーチャンス」とはどういう状態？",
   opts:["山に牌が0枚","ある牌が3枚見えて両面が成立しない","自分の手牌に4枚ある","字牌が全部出た"],ans:1,
   exp:"ある数牌が3枚見えると、残り1枚で両面待ちの成立が非常に難しくなります。"},
  {q:"「筋引っかけ」として正しいものは？",
   opts:["3を捨てて3-6待ち（6が当たり牌）","1を捨てて1-2待ち","9を捨てて8-9待ち","字牌を捨てて字牌待ち"],ans:0,
   exp:"捨て牌3の筋牌6が実は当たり牌になっているのが筋引っかけです。"},
  {q:"守備優先順位として最も安全な牌のカテゴリは？",
   opts:["筋牌","無筋中張牌","現物","字牌"],ans:2,
   exp:"現物（ロン和了できない牌）は完全安全です。"},
  {q:"「ワンチャンス」とは何枚見えている状態？",
   opts:["1枚","2枚","3枚","4枚"],ans:1,
   exp:"ある牌が2枚見えている状態をワンチャンスと言います。"},
  {q:"3と7が特に危険な理由は？",
   opts:["字牌に近いから","最も多くの待ちパターンに絡むから","1枚しかないから","中央の牌だから"],ans:1,
   exp:"3と7は両面・カンチャン・ペンチャンの全待ちタイプで中心になる危険な牌です。"},
  {q:"序盤に安全に切りやすい牌の組み合わせは？",
   opts:["5・6・7","2・3・4","1・9・字牌","4・5・6"],ans:2,
   exp:"序盤は端牌（1・9）と字牌から切るのが基本です。"},
  {q:"「中筋」とは？",
   opts:["5の筋牌","複数の筋に属する牌","壁の中にある牌","手牌の中央の牌"],ans:1,
   exp:"中筋とは複数の捨て牌の筋に該当する牌で、より安全度が高くなります。"},
];

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showExp, setShowExp] = useState(false);

  const q = QUIZ_DATA[current];

  const handleSelect = (idx) => {
    if(selected!==null)return;
    setSelected(idx);
    setShowExp(true);
    if(idx===q.ans)setScore(s=>s+1);
  };

  const handleNext = () => {
    if(current+1>=QUIZ_DATA.length){setFinished(true);}
    else{setCurrent(c=>c+1);setSelected(null);setShowExp(false);}
  };

  const handleReset = () => {
    setCurrent(0);setSelected(null);setScore(0);setFinished(false);setShowExp(false);
  };

  if(finished){
    const pct=Math.round(score/QUIZ_DATA.length*100);
    return(
      <Card title="クイズ結果" icon="🏆" accent={C.gold}>
        <div style={{textAlign:"center",padding:"20px 0"}}>
          <div style={{fontSize:48,marginBottom:8}}>{pct>=80?"🏆":pct>=60?"⭐":"📚"}</div>
          <div style={{fontSize:32,fontWeight:900,color:pct>=80?C.safe:pct>=60?C.warn:C.danger,marginBottom:8}}>
            {score} / {QUIZ_DATA.length}問正解
          </div>
          <div style={{fontSize:20,color:C.inkMid,marginBottom:16}}>{pct}%</div>
          <div style={{color:C.ink,fontSize:14,marginBottom:20}}>
            {pct>=80?"素晴らしい！守備力は完璧です。":pct>=60?"良い出来です。もう少し練習しましょう。":"まだ伸びしろがあります。もう一度学習しましょう。"}
          </div>
          <button onClick={handleReset} style={{padding:"10px 24px",background:C.gold,color:"#fff",border:"none",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
            もう一度挑戦
          </button>
        </div>
      </Card>
    );
  }

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{color:C.inkLight,fontSize:13}}>問題 {current+1} / {QUIZ_DATA.length}</span>
        <Badge color={C.gold}>スコア: {score}点</Badge>
      </div>
      <Card title={q.q} icon="❓" accent={C.blue}>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
          {q.opts.map((opt,i)=>{
            const isCorrect=i===q.ans;
            const isSelected=i===selected;
            let bg=C.bgLight,border=C.cardBorder,color=C.ink;
            if(selected!==null){
              if(isCorrect){bg=C.safePale;border=C.safe;color=C.safe;}
              else if(isSelected){bg=C.dangerPale;border=C.danger;color=C.danger;}
            }
            return(
              <button key={i} onClick={()=>handleSelect(i)} disabled={selected!==null}
                style={{padding:"12px 16px",background:bg,border:`2px solid ${border}`,borderRadius:8,color,fontSize:14,textAlign:"left",cursor:selected!==null?"default":"pointer",fontWeight:isSelected||isCorrect?"700":"400",transition:"all 0.2s"}}>
                {["A","B","C","D"][i]}. {opt}
                {selected!==null&&isCorrect&&" ✓"}
                {selected!==null&&isSelected&&!isCorrect&&" ✗"}
              </button>
            );
          })}
        </div>
        {showExp&&(
          <div style={{background:selected===q.ans?C.safePale:C.dangerPale,borderRadius:8,padding:"12px",marginBottom:12}}>
            <div style={{fontWeight:700,color:selected===q.ans?C.safe:C.danger,fontSize:13,marginBottom:4}}>
              {selected===q.ans?"✓ 正解！":"✗ 不正解"}
            </div>
            <div style={{color:C.ink,fontSize:13,lineHeight:1.6}}>{q.exp}</div>
          </div>
        )}
        {selected!==null&&(
          <button onClick={handleNext} style={{width:"100%",padding:"10px",background:C.gold,color:"#fff",border:"none",borderRadius:6,fontSize:14,fontWeight:700,cursor:"pointer"}}>
            {current+1>=QUIZ_DATA.length?"結果を見る":"次の問題 →"}
          </button>
        )}
      </Card>
    </div>
  );
}

const TABS=[
  {id:"suji",label:"筋の基礎",icon:"🎯"},
  {id:"kabe",label:"壁の活用",icon:"🧱"},
  {id:"combined",label:"複合応用",icon:"⚔️"},
  {id:"battle",label:"実戦読み",icon:"🔍"},
  {id:"defense",label:"守備優先順位",icon:"🛡️"},
  {id:"quiz",label:"確認クイズ",icon:"📝"},
];

export default function App() {
  const [tab, setTab] = useState("suji");
  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(160deg,#eaf6fc 0%,#daeef8 55%,#c5e4f0 100%)`,fontFamily:"system-ui,sans-serif"}}>
      <FontLoader/>
      <div style={{maxWidth:700,margin:"0 auto",padding:"0 12px 40px"}}>
        <div style={{textAlign:"center",padding:"28px 0 20px"}}>
          <div style={{fontSize:40,marginBottom:8}}>🀄</div>
          <h1 style={{fontSize:22,fontWeight:900,color:C.ink,margin:0,letterSpacing:"-0.02em"}}>筋と壁の道場</h1>
          <p style={{color:C.inkLight,fontSize:13,margin:"6px 0 0"}}>麻雀中級者向け防御理論学習アプリ</p>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"center",marginBottom:20}}>
          {TABS.map(({id,label,icon})=>(
            <button key={id} onClick={()=>setTab(id)}
              style={{padding:"7px 12px",background:tab===id?C.gold:"#fff",color:tab===id?"#fff":C.inkMid,
                border:`1.5px solid ${tab===id?C.gold:C.cardBorder}`,borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer",
                display:"flex",alignItems:"center",gap:4,transition:"all 0.2s"}}>
              <span>{icon}</span><span>{label}</span>
            </button>
          ))}
        </div>
        <div>
          {tab==="suji"&&<SujiBasics/>}
          {tab==="kabe"&&<KabeSection/>}
          {tab==="combined"&&<CombinedSection/>}
          {tab==="battle"&&<RealBattleSection/>}
          {tab==="defense"&&<DefensePriority/>}
          {tab==="quiz"&&<QuizSection/>}
        </div>
      </div>
    </div>
  );
}
