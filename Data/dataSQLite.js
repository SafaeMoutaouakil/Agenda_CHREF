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
      );`,
      [],
      () => { console.log('Table Deputes created successfully'); },
      (error) => { console.log('Error creating Deputes table: ' + error.message); }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categorieorganes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Nom_Ar TEXT,
        Nom_Fr TEXT
      );`,
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
        Presentation_Fr TEXT
      );`,
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
        FOREIGN KEY(Salles_ID) REFERENCES SallesReunion(id)
      );`,
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
      );`,
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
        Idcategorieorganes INTEGER,
        FOREIGN KEY(DeputesId) REFERENCES Deputes(id),
        FOREIGN KEY(organeID) REFERENCES organes(id),
        FOREIGN KEY(Idcategorieorganes) REFERENCES categorieorganes(id)
      );`,
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

export const insertDeputesOrganes = (DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026, Idcategorieorganes) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Deputes_organes (DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026, Idcategorieorganes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [DeputesId, organeID, RoleID, Date_Debut, Date_Fin, Inactif, Leg20162021, Leg20212026, Idcategorieorganes],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into Deputes_organes:', error);
          reject(error);
        }
      );
    });
  });
};

export const insertOrganes = (Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO organes (Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr) VALUES (?, ?, ?, ?)',
        [Nom_Ar, Nom_Fr, Presentation_Ar, Presentation_Fr],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('Error inserting into organes:', error);
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
          console.log('Error inserting into Reunion:', error.message);
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

       // Insert categories
       await insertCategorieOrganes('رئيس مجلس النواب', 'President of the Council');
       await insertCategorieOrganes('النائب الأول للرئيس', 'First Vice President');
       await insertCategorieOrganes('النائب الثاني للرئيس', 'Second Vice President');
       await insertCategorieOrganes('النائب الثالث للرئيس', 'Third Vice President');
       await insertCategorieOrganes('النائب الرابع للرئيس', 'Fourth Vice President');
       await insertCategorieOrganes('النائب الخامس للرئيس', 'Fifth Vice President');
       await insertCategorieOrganes('النائبة السادسة للرئيس', 'Sixth Vice President');
       await insertCategorieOrganes('النائبة السابعة للرئيس', 'Seventh Vice President');
       await insertCategorieOrganes('النائب الثامن للرئيس', 'Eighth Vice President');
       await insertCategorieOrganes('محاسب المجلس', 'Council Accountant');
       await insertCategorieOrganes('أمين المجلس', 'Council Secretary');
       await insertCategorieOrganes('أمينة المجلس', 'Council Secretary');
 
       // Insert organes
       await insertOrganes('فريق حزب التجمع الوطني للأحرار', 'RNI Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('فريق الأصالة والمعاصرة', 'PAM Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('الفريق الاستقلالي للوحدة والتعادلية', 'Istiqlal Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('الفريق الاشتراكي - المعارضة الاتحادية', 'Socialist Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('الفريق الحركي', 'Movement Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('الفريق الدستوري الديمقراطي الاجتماعي', 'Constitutional Group', 'Présentation en Arabe', 'Presentation in French');
       await insertOrganes('فريق التقدم والاشتراكية', 'Progress and Socialism Group', 'Présentation en Arabe', 'Presentation in French');
      
      
 
       // Insert deputies
       await insertDeputes('Code1', 'الطالبي العلمي', 'Nom Fr 1', 'راشيد', 'Prenom Fr 1', 'M', 1, 'email1@example.com', '123456789');
       await insertDeputes('Code2', 'صباري', 'Nom Fr 2', 'محمد', 'Prenom Fr 2', 'M', 1, 'email2@example.com', '987654321');
       await insertDeputes('Code3', 'قيوح', 'Nom Fr 3', 'عبد الصمد', 'Prenom Fr 3', 'M', 1, 'email3@example.com', '123456123');
       await insertDeputes('Code4', 'اشطيبي', 'Nom Fr 4', 'ادريس', 'Prenom Fr 4', 'M', 1, 'email4@example.com', '321654987');
       await insertDeputes('Code5', 'والزين', 'Nom Fr 5', 'محمد', 'Prenom Fr 5', 'M', 1, 'email5@example.com', '456789123');
       await insertDeputes('Code6', 'جودار', 'Nom Fr 6', 'محمد', 'Prenom Fr 6', 'M', 1, 'email6@example.com', '654123789');
       await insertDeputes('Code7', 'تهامي', 'Nom Fr 7', 'نادية', 'Prenom Fr 7', 'F', 1, 'email7@example.com', '789123456');
       await insertDeputes('Code8', 'إدحلي', 'Nom Fr 8', 'زينب', 'Prenom Fr 8', 'F', 1, 'email8@example.com', '321987456');
       await insertDeputes('Code9', 'غيات', 'Nom Fr 9', 'محمد', 'Prenom Fr 9', 'M', 1, 'email9@example.com', '654789321');
       await insertDeputes('Code10', 'الحموتي', 'Nom Fr 10', 'محمد', 'Prenom Fr 10', 'M', 1, 'email10@example.com', '987321456');
       await insertDeputes('Code11', 'قديري', 'Nom Fr 11', 'طارق', 'Prenom Fr 11', 'M', 1, 'email11@example.com', '123654789');
       await insertDeputes('Code12', 'حمية', 'Nom Fr 12', 'امبارك', 'Prenom Fr 12', 'M', 1, 'email12@example.com', '456321987');
       await insertDeputes('Code13', 'بزداف', 'Nom Fr 13', 'نادية', 'Prenom Fr 13', 'F', 1, 'email13@example.com', '789654123');
       await insertDeputes('Code14', 'الأنصاري', 'Nom Fr 14', 'مروى', 'Prenom Fr 14', 'F', 1, 'email14@example.com', '321456789');
       
     


      // Data for Deputes_organes
// Exemple d'insertion de données pour Deputes_organes
await insertDeputesOrganes(1, 1, 1, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 1);  // راشيد الطالبي العلمي, RNI Group, رئيس مجلس النواب
await insertDeputesOrganes(2, 2, 2, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 2);  // محمد صباري, PAM Group, النائب الأول للرئيس
await insertDeputesOrganes(3, 3, 3, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 3);  // عبد الصمد قيوح, Istiqlal Group, النائب الثاني للرئيس
await insertDeputesOrganes(4, 4, 4, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 4);  // ادريس اشطيبي, Socialist Group, النائب الثالث للرئيس
await insertDeputesOrganes(5, 5, 5, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 5);  // محمد والزين, Movement Group, النائب الرابع للرئيس
await insertDeputesOrganes(6, 6, 6, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 6);  // محمد جودار, Constitutional Group, النائب الخامس للرئيس
await insertDeputesOrganes(7, 7, 7, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 7);  // نادية تهامي, Progress and Socialism Group, النائبة السادسة للرئيس
await insertDeputesOrganes(8, 1, 8, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 8);  // زينب إدحلي, RNI Group, النائبة السابعة للرئيس
await insertDeputesOrganes(9, 1, 9, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 9);  // محمد غيات, RNI Group, النائب الثامن للرئيس
await insertDeputesOrganes(10, 2, 10, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 10); // محمد الحموتي, PAM Group, محاسب المجلس
await insertDeputesOrganes(11, 3, 11, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026' , 10); // طارق قديري, Istiqlal Group, محاسب المجلس
await insertDeputesOrganes(12, 1, 12, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 11); // امبارك حمية, RNI Group, أمين المجلس
await insertDeputesOrganes(13, 2, 13, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 12); // نادية بزداف, PAM Group, أمينة المجلس
await insertDeputesOrganes(14, 3, 14, '2024-01-01', '2024-12-31', 0, 'Leg20162021', 'Leg20212026', 12); // مروى الأنصاري, Istiqlal Group, أمينة المجلس
//reunions
await insertReunion('2024-08-06', '14:00', 'Sujet Ar 2', 'Détails 2', 1, 1, 'Observation 2', 'Lieu 2', '2024-07-02');
await insertReunion('2024-08-10', '16:00', 'Sujet Ar 3', 'Détails 3', 1, 1, 'Observation 3', 'Lieu 3', '2024-07-03');
      
    });
  } catch (error) {
    console.log('Error inserting data: ' + error.message);
  }
};




export const getDeputesInfo = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
       ` SELECT DISTINCT
          Deputes.Nom_Ar || ' ' || Deputes.Prenom_Ar AS name,
          Organes.Nom_Ar AS organ_group,
          CategorieOrganes.Nom_Ar AS title
        FROM
          Deputes
        JOIN
          Deputes_organes ON Deputes.id = Deputes_organes.DeputesId   
        JOIN
          Organes ON Deputes_organes.organeID = Organes.id
        JOIN
          CategorieOrganes ON Deputes_organes.Idcategorieorganes = CategorieOrganes.id;`,
        [],
        (tx, results) => {
          let deputesInfo = [];
          for (let i = 0; i < results.rows.length; i++) {
            deputesInfo.push(results.rows.item(i));
          }
          resolve(deputesInfo);
        },
        error => {
          reject(error);
        }
      );
    });
  });
};


// Selection methods

export const selectOrganes = async () => {
  try {
    return await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT  DISTINCT Nom_Ar FROM organes',
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
      let query = 'SELECT DISTINCT Date_Reunion, Heure_Reunion, Sujet_Ar, Details, IDorganes, Salles_ID, Observation, Lieu FROM Reunion WHERE 1=1';
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

      console.log('Executing query:', query);
      console.log('With params:', params);

      tx.executeSql(
        query,
        params,
        (tx, results) => {
          const meetings = [];
          for (let i = 0; i < results.rows.length; i++) {
            meetings.push(results.rows.item(i));
          }
          console.log('Résultats de la recherche:', meetings);
          resolve(meetings);
        },
        (tx, error) => {
          console.error('Error executing search query:', error.message);
          reject(error);
        }
      );
    });
  });
};




// Fetch data functions
export const getLastMeetings = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Reunion ORDER BY Date_Reunion DESC LIMIT 10',
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (error) => reject(error)
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