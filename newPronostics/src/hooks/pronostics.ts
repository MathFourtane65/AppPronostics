import { useState } from "react";
import axios from "axios";

export function usePronostics() {
  const [pronostics, setPronostics] = useState<Pronostic[]>([]);

  const getAllPronostics = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/pronostics",
      data: {},
    });
    setPronostics(response.data);
  };

  const getOnePronostic = async (pronosticId: string) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/api/pronostics/${pronosticId}`,
      data: {},
    });
    return response.data;
  };

  const createOnePronostic = async (pronostic: Pronostic) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/pronostics",
      data: pronostic,
    });
    const newPronostics = [pronostic, ...pronostics];
    setPronostics(newPronostics);
  };

  const deleteOnePronostic = async (pronosticId: string) => {
    await axios.delete(
      `http://localhost:3000/api/pronostics/${pronosticId}`
    );
    const updatedPronostics = pronostics.filter(
      (pronostic) => pronostic._id !== pronosticId
    );
    setPronostics(updatedPronostics);
  };

  return {
    pronostics,
    getAllPronostics,
    getOnePronostic,
    createOnePronostic,
    deleteOnePronostic,
  };
}

export interface Pronostic {
  _id?: any;
  halfTimeScoreTeamA?: number;
  halfTimeScoreTeamB?: number;
  endMatchScoreTeamA?: number;
  endMatchScoreTeamB?: number;
  endPenaltiesScoreTeamA?: number;
  endPenaltiesScoreTeamB?: number;
  id_user?: string;
  id_match?: string;
  points?: number;
}
