import React, { useState, useEffect } from "react";
import "../styles/Game.css";

export default function Game() {
  const [playerAction, setPlayerAction] = useState("idle");
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [inventory] = useState([
    { id: 1, name: "Espada" },
    { id: 2, name: "Poção de Cura" },
    { id: 3, name: "Escudo" }
  ]);

  const handleKeyDown = (e) => {
    if (inventoryOpen) return;

    switch (e.key) {
      case "a":
        setPlayerAction("attack");
        break;
      case "d":
        setPlayerAction("dodge");
        break;
      case "i":
        setInventoryOpen((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = () => {
    if (!inventoryOpen) {
      setPlayerAction("idle");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [inventoryOpen]);

  return (
    <div className="game-container">
      <h1>Mini Game com Spritesheet</h1>
      <p>Teclas: <b>[A]</b> Atacar | <b>[D]</b> Esquivar | <b>[I]</b> Inventário</p>

      <div className={`player ${playerAction}`} />

      {inventoryOpen && (
        <div className="inventory">
          <h2>Inventário 📦</h2>
          <ul>
            {inventory.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <small>Pressione [I] para fechar</small>
        </div>
      )}
    </div>
  );
}
