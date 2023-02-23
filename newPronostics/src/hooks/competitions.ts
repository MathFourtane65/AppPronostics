import { useState } from "react";
import axios from "axios";

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  const getAllCompetitions = async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/competitions",
      data: {},
    });
    setCompetitions(response.data);
  };

  const getOneCompetition = async (competitionId: string) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/api/competitions/${competitionId}`,
      data: {},
    });
    return response.data;
  };

  const createOneCompetition = async (competition: Competition) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3000/api/competitions",
      data: competition,
    });
    const newCompetitions = [competition, ...competitions];
    setCompetitions(newCompetitions);
  };

  const deleteOneCompetition = async (competitionId: string) => {
    await axios.delete(`http://localhost:3000/api/competitions/${competitionId}`);
    const updatedCompetitions = competitions.filter((competition) => competition._id !== competitionId);
    setCompetitions(updatedCompetitions);
  };


  // const deleteOneCompetition = async (competition: Competition) => {
  //     const response = await axios({
  //         method: "delete",
  //         url: "http://localhost:3000/api/competitions",
  //         data: competition
  //         });
  //     const newCompetitions = [competition, ...competitions];
  //     setCompetitions(newCompetitions);
  // };

  return {
    competitions,
    getAllCompetitions,
    createOneCompetition,
    deleteOneCompetition,
    getOneCompetition,
  };
}

export interface Competition {
  _id?: any;
  name?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  numberMatches?: string;
  listMatches?: [string];
}
