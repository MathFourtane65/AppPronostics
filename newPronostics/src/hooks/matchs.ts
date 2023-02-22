import { useState } from "react";
import axios from "axios";

export function useMatchs() {
  const [matchs, setMatchs] = useState<Match[]>([]);

  const getAllMatchs = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/matchs",
      data: {},
    });
    setMatchs(response.data);
  };

  const createOneMatch = async (match: Match) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/matchs",
      data: match,
    });
    const newMatchs = [match, ...matchs];
    setMatchs(newMatchs);
  };

  const deleteOneMatch = async (matchId: string) => {
    await axios.delete(`http://localhost:3000/api/matchs/${matchId}`);
    const updatedMatchs = matchs.filter((match) => match._id !== matchId);
    setMatchs(updatedMatchs);
  };



  return {
    matchs,
    getAllMatchs,
    createOneMatch,
    deleteOneMatch,
  };
}

export interface Match {
  _id?: any;
  nameTeamA?: string;
  nameTeamB?: string;
  place?: string;
  date?: string;
  halfTimeScore?: string;
  endMatchScore?: string;
  endPenaltiesScore?: string;
  winnerTeam?: string;
  status?: string;
  colorTeamA?: string;
  colorTeamB?: string;
  id_competition?: string;
}
