import database from "../config/mysql_config";

import Response from "../domain/response";

import log from "../util/logger";

import QUERY from "../query/patient.query";
import { status } from "http-status";

export const getPatients = (req, res) => {
  log.info(`${req.method} ${req.originalurl},fetching patients`);
  database.query(QUERY.SELECT_PATIENTS, (error, result) => {
    if (!result) {
      res
        .status(status.OK)
        .send(new Response(status.OK, "No patients found!!"));
    } else {
      res.status(status.OK).send(
        new Response(status.OK, "Patients retrived!", {
          patients: result,
        })
      );
    }
  });
};

export const createPatient = (req, res) => {
  log.info(`${req.method} ${req.originalurl},creating patients`);
  database.query(
    QUERY.CREATE_PATIENT,
    Object.values(req.body),
    (error, result) => {
      if (!result) {
        res
          .status(status.INTERNAL_SERVER_ERROR)
          .send(new Response(status.INTERNAL_SERVER_ERROR, "Error occured!"));
      } else {
        const patient = {
          id: result.insertedId,
          ...req.body,
          created_at: new Date(),
        };
        res.status(status.OK).send(
          new Response(status.CREATED, "Patients created successfuly!", {
            patient,
          })
        );
      }
    }
  );
};

export const getPatient = (req, res) => {
  log.info(`${req.method} ${req.originalurl},fetching patients`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
    if (!result[0]) {
      res
        .status(status.NOT_FOUND)
        .send(
          new Response(
            status.NOT_FOUND,
            `"No patient found by this id ${req.params.id}!!"`
          )
        );
    } else {
      res
        .status(status.OK)
        .send(new Response(status.OK, "Patients retrived!", result[0]));
    }
  });
};
export const updatePatient = (req, res) => {
  log.info(`${req.method} ${req.originalurl},fetching patients`);
  database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, result) => {
    if (!result[0]) {
      res
        .status(status.NOT_FOUND)
        .send(
          new Response(
            status.NOT_FOUND,
            `"No patient found by this id ${req.params.id}!!"`
          )
        );
    } else {
      log.info(`{req.method} ${req.originalurl} updating patient`);
      database.query(
        QUERY.UPDATE_PATIENT,
        [...Object.values(req.body), req.params.id],
        (error, result) => {
          if (!error) {
            res.status(status.OK).send(
              new Response(status.OK, "Patient updated", {
                id: req.params.id,
                ...req.body,
              })
            );
          } else {
            log.error(error.message);
            res
              .status(status.INTERNAL_SERVER_ERROR)
              .send(
                new Response(status.INTERNAL_SERVER_ERROR, "Error occured!")
              );
          }
        }
      );
    }
  });
};

export const deletePatient = (req, res) => {
  log.info(`${req.method} ${req.originalurl},deleting patients`);
  database.query(QUERY.DELETE_PATIENTS, [req.params.id], (error, result) => {
    if (!result.affectedRows>0) {
        res
        .status(status.OK)
        .send(new Response(status.OK, "Patients deleted!", result[0]));
    } else {
      res
        .status(status.NOT_FOUND)
        .send(new Response(status.NOT_FOUND, "Patients not found!"));
    }
  });
};
