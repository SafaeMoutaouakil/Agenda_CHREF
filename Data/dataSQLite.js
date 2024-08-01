import SQLite from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Open a database
const db = SQLite.openDatabase({ name: 'database.db', location: 'default' }, () => { 
  console.log('Database opened successfully'); 
}, 
(error) => { 
  console.log('Error: ' + error.message); 
});

// Check Internet connection
export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Store connection status
export const storeConnectionStatus = async (status) => {
  try {
    await AsyncStorage.setItem('isConnected', JSON.stringify(status));
  } catch (error) {
    console.log('Error storing connection status: ' + error.message);
  }
};

// Retrieve connection status
export const getConnectionStatus = async () => {
  try {
    const status = await AsyncStorage.getItem('isConnected');
    return status ? JSON.parse(status) : null;
  } catch (error) {
    console.log('Error retrieving connection status: ' + error.message);
    return null;
  }
};

// Function to create tables
export const createTables = async () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Deputes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        Nom_Ar TEXT,
        Nom_Fr TEXT,
        Prenom_Ar TEXT,
        Prenom_Fr TEXT,
        Sexe TEXT,
        Actif INTEGER CHECK (Actif IN (0, 1)),
        Email TEXT,
        Telephone TEXT
      )`,
      [],
      () => { console.log('Table Deputes created successfully'); },
      (error) => { console.log('Error creating Deputes table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categorieorganes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nom_Ar TEXT,
        Nom_Fr TEXT
      )`,
      [],
      () => { console.log('Table categorieorganes created successfully'); },
      (error) => { console.log('Error creating categorieorganes table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS organes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nom_Ar TEXT,
        Nom_Fr TEXT,
        Presentation_Ar TEXT,
        Presentation_Fr TEXT,
        Idcategorieorganes INTEGER,
        FOREIGN KEY(Idcategorieorganes) REFERENCES categorieorganes(id)
      )`,
      [],
      () => { console.log('Table organes created successfully'); },
      (error) => { console.log('Error creating organes table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Reunion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Date_Reunion TEXT,
        Heure_Reunion TEXT,
        Sujet_Ar TEXT,
        Details TEXT,
        IDorganes INTEGER,
        Salles_ID INTEGER,
        Observation TEXT,
        Lieu TEXT,
        Update_Date TEXT,
        FOREIGN KEY(IDorganes) REFERENCES organes(id),
        FOREIGN KEY(Salles_ID) REFERENCES SallesReunion(id),
        UNIQUE(IDorganes, Salles_ID)

      )`,
      [],
      () => { console.log('Table Reunion created successfully'); },
      (error) => { console.log('Error creating Reunion table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS SallesReunion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Salle_Ar TEXT,
        Salle_Fr TEXT,
        Order_ INTEGER,
        Flag INTEGER
      )`,
      [],
      () => { console.log('Table SallesReunion created successfully'); },
      (error) => { console.log('Error creating SallesReunion table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Deputes_organes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        DeputesId INTEGER,
        organeID INTEGER,
        RoleID INTEGER,
        Date_Debut TEXT,
        Date_Fin TEXT,
        Inactif INTEGER CHECK (Inactif IN (0, 1)),
        Leg20162021 TEXT,
        Leg20212026 TEXT,
        FOREIGN KEY(DeputesId) REFERENCES Deputes(id),
        FOREIGN KEY(organeID) REFERENCES organes(id)
      )`,
      [],
      () => { console.log('Table Deputes_organes created successfully'); },
      (error) => { console.log('Error creating Deputes_organes table: ' + error.message); }
    );
  });
};

// Insert functions
export const insertDeputes = (code, Nom_Ar, Nom_Fr, Prenom_Ar, Prenom_Fr, Sexe, Actif, Email, Telephone) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Deputes (code, Nom_Ar, Nom_Fr, Prenom_Ar, Prenom_Fr, Sexe, Actif, Email, Telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [code, Nom_Ar, Nom_Fr, Prenom_Ar, Prenom_Fr, Sexe, Actif, Email, Telephone],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into Deputes:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertReunion = (Date_Reunion, Heure_Reunion, Sujet_Ar, Details, IDorganes, Salles_ID, Observation, Lieu, Update_Date) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Reunion (Date_Reunion, Heure_Reunion, Sujet_Ar, Details, IDorganes, Salles_ID, Observation, Lieu, Update_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [Date_Reunion, Heure_Reunion, Sujet_Ar, Details, IDorganes, Salles_ID, Observation, Lieu, Update_Date],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into Reunion:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertSallesReunion = (Salle_Ar, Salle_Fr, Order_, Flag) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO SallesReunion (Salle_Ar, Salle_Fr, Order_, Flag) VALUES (?, ?, ?, ?)',
        [Salle_Ar, Salle_Fr, Order_, Flag],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into SallesReunion:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertDeputesOrganes = (DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Deputes_organes (DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into Deputes_organes:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertOrganes = (Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr, Idcategorieorganes) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO organes (Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr, Idcategorieorganes) VALUES (?, ?, ?, ?, ?)',
        [Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr, Idcategorieorganes],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into organes:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertCategorieOrganes = (Nom_Ar, Nom_Fr) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO categorieorganes (Nom_Ar, Nom_Fr) VALUES (?, ?)',
        [Nom_Ar, Nom_Fr],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into categorieorganes:', error);
          reject(error);
        }
      );
    });
  });
};

// Function to insert data into all tables
export const insertData = async () => {
  try {
    await db.transaction(async tx => {
      // Data for SallesReunion
      await insertSallesReunion('Salle 1 Ar', 'Salle 1 Fr', 1, 0);
      await insertSallesReunion('Salle 2 Ar', 'Salle 2 Fr', 2, 1);

      // Data for categorieorganes
      await insertCategorieOrganes('Catégorie 1 Ar', 'Catégorie 1 Fr');
      await insertCategorieOrganes('Catégorie 2 Ar', 'Catégorie 2 Fr');

      // Data for organes
      await insertOrganes('Organe 1 Ar', 'Organe 1 Fr', 'Présentation 1 Ar', 'Présentation 1 Fr', 1);
      await insertOrganes('Organe 2 Ar', 'Organe 2 Fr', 'Présentation 2 Ar', 'Présentation 2 Fr', 2);

      // Data for Deputes
      await insertDeputes('Code1', 'Nom1 Ar', 'Nom1 Fr', 'Prenom1 Ar', 'Prenom1 Fr', 'M', 1, 'email1@example.com', '123456789');
      await insertDeputes('Code2', 'Nom2 Ar', 'Nom2 Fr', 'Prenom2 Ar', 'Prenom2 Fr', 'F', 1, 'email2@example.com', '987654321');

      // Data for Deputes_organes
      await insertDeputesOrganes(1, 1, 1, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026');

      // Data for Reunion
      await insertReunion('2024-07-01', '10:00', 'Sujet Ar', 'Détails', 1, 1, 'Observation', 'Lieu', '2024-07-01');
      await insertReunion('2024-08-01', '12:00', 'Sujet Fr', 'Détails', 2, 1, 'Obs', 'Lieu', '2024-08-01');

      
    });
  } catch (error) {
    console.log('Error inserting data: ' + error.message);
  }
};







// Selection methods

export const selectOrganes = async () => {
  try {
    return await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM organes',
          [],
          (tx, results) => {
            const rows = results.rows.raw(); // or results.rows._array
            resolve(rows);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Error fetching organes:', error);
    throw error; // Optionally rethrow the error if needed
  }
};

export const selectSallesReunion = async () => {
  try {
    return await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM SallesReunion',
          [],
          (tx, results) => {
            const rows = results.rows.raw(); // or results.rows._array
            resolve(rows);
          },
          (tx, error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    console.error('Error fetching SallesReunion:', error);
    throw error; // Optionally rethrow the error if needed
  }
};

// Ajouter cette méthode dans dataSQLite.js

export const searchReunions = (selectedAuthority, location, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let query = 'SELECT  DISTINCT * FROM Reunion WHERE 1=1';
      let params = [];

      if (selectedAuthority) {
        query += ' AND IDorganes = ?';
        params.push(selectedAuthority);
      }

      if (location) {
        query += ' AND Salles_ID = (SELECT id FROM SallesReunion WHERE Salle_Ar = ? OR Salle_Fr = ?)';
        params.push(location, location);
      }

      if (startDate) {
        query += ' AND Date_Reunion >= ?';
        params.push(startDate);
      }

      if (endDate) {
        query += ' AND Date_Reunion <= ?';
        params.push(endDate);
      }

      tx.executeSql(
        query,
        params,
        (_, result) => resolve(result.rows.raw()),
        (_, error) => {
          console.log('Error searching reunions:', error);
          reject(error);
        }
      );
    });
  });
};




// Initialize the database and insert data
export const initializeDatabase = async () => {
  try {
    await createTables();
    await insertData(); // Populate the database with initial data
  } catch (error) {
    console.log('Error initializing  database: ' + error.message);
  }
};