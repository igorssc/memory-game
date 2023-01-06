import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const Records = () => {
  const { records } = useContext(GameContext);

  return (
    <>
      <div style={{ width: "100%", overflowX: "scroll", borderRadius: "5px" }}>
        {records && (
          <table className="w-full rounded m-auto bg-zinc-500 border-collapse text-center mb-8">
            <thead>
              <tr className="h-12 bg-cyan-500 text-zinc-900">
                <th className="font-normal">Nome</th>
                <th className="font-normal">Pontuação</th>
                <th className="font-normal">Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map((value) => (
                <tr key={value.id} className="even:bg-zinc-600 h-12">
                  <td className="px-4 font-normal whitespace-normal text-xs md:text-base">
                    {value.name}
                  </td>
                  <td className="px-4 font-normal whitespace-normal text-xs md:text-base">
                    {value.score.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 font-normal whitespace-normal text-xs md:text-base">
                    {new Date(value.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
