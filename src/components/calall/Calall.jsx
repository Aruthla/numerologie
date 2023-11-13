import './calall.scss'
import data from '../../data';
import React, { useState } from 'react';

function CalDateBirth() {
  const [jour, setJour] = useState('');
  const [mois, setMois] = useState('');
  const [annee, setAnnee] = useState('');
  const [applyRule, setApplyRule] = useState(false);
  const [applyLigneRule, setApplyLigneRule] = useState(false);
  const [applyNumberRule, setApplyNumberRule] = useState(false);

  const [resultats, setResultats] = useState({
    Jour: null,
    Mois: null,
    Annee: null,
    PP: null,
    NE: null,
    CI: null,
    CE: null,
    PE: null,
    RH: null,
  });

  const [cardResultats, setCardResultats] = useState({
    tarotCardDay: data.find(card => card.id === 0),
    tarotCardMounth: data.find(card => card.id === 0),
    tarotCardYear: data.find(card => card.id === 0),
    tarotCardPP: data.find(card => card.id === 0),
    tarotCardNE: data.find(card => card.id === 0),
    tarotCardCI: data.find(card => card.id === 0),
    tarotCardCE: data.find(card => card.id === 0),
    tarotCardPE: data.find(card => card.id === 0),
    tarotCardRH: data.find(card => card.id === 0),
  });

  const [applyRuleCards, setApplyRuleCards] = useState({
    smallCardMounth: data.find(card => card.id === 0),
    smallCardPP: data.find(card => card.id === 0),
    smallCardCI: data.find(card => card.id === 0),
    smallCardCE: data.find(card => card.id === 0),
    smallCardPE: data.find(card => card.id === 0),
    smallCardRH: data.find(card => card.id === 0),
  });

  let ligneJour, ligneMois, ligneAnnee

  const [ligneResultats, setLigneResultats] = useState({
    LigneJour: null,
    LigneMois: null,
    LigneAnnee: null,
    LignePP: null,
    LigneNE: null,
    LigneCI: null,
    LigneCE: null,
    LignePE: null,
    LigneRH: null,
  });

  const [displayLigne, setDisplayLigne] = useState(false);

  const [numberResultats, setNumberResultats] = useState({
    NumberJour: null,
    NumberMois: null,
    NumberAnnee: null,
    NumberPP: null,
    NumberNE: null,
    NumberCI: null,
    NumberCE: null,
    NumberPE: null,
    NumberRH: null,
  });

  // Fonction pour additionner les chiffres et appliquer les règles
  const addRules = (nombre) => {
    if (nombre > 22) {
      const chiffres = Array.from(nombre.toString()).map(Number);
      const somme = chiffres.reduce((acc, chiffre) => acc + chiffre, 0);

      let sommeStr = somme.toString(); // Convertir somme en une chaîne de caractères

      // Initialiser une variable pour stocker le résultat de l'addition
      let resultat = "";

      // Parcourir chaque chiffre dans sommeStr
      for (let i = 0; i < sommeStr.length; i++) {
        resultat += sommeStr.charAt(i); // Ajouter le chiffre au résultat avec un signe +
      }

      // Convertir le résultat en un nombre entier
      resultat = parseInt(resultat);

      return resultat; // Retourner le résultat de l'addition des chiffres
    } else {
      return nombre;
    }
  };

  const addLigneRules = (ligneNombre) => {
    if (ligneNombre > 10) {
      const ligneChiffres = Array.from(ligneNombre.toString()).map(Number);
      const ligneSomme = ligneChiffres.reduce((acc, chiffre) => acc + chiffre, 0);

      let ligneSommeStr = ligneSomme.toString(); // Convertir somme en une chaîne de caractères

      // Initialiser une variable pour stocker le résultat de l'addition
      let ligneResultat = "";

      // Parcourir chaque chiffre dans sommeStr
      for (let i = 0; i < ligneSommeStr.length; i++) {
        ligneResultat += ligneSommeStr.charAt(i); // Ajouter le chiffre au résultat avec un signe +
      }

      // Convertir le résultat en un nombre entier
      ligneResultat = parseInt(ligneResultat);

      return ligneResultat; // Retourner le résultat de l'addition des chiffres
    } else {
      return ligneNombre;
    }
  };

  const calResultats = () => {
    let jourNum = parseInt(jour);
    const moisNum = parseInt(mois);
    let anneeNum = Array.from(annee.toString()).map(Number).reduce((acc, chiffre) => acc + chiffre, 0);
    let PP, CI, CE, PE, RH;

    PP = addRules(jourNum) + moisNum + addRules(anneeNum);
    const NE = addRules(jourNum) + addRules(anneeNum);
    CI = addRules(jourNum) + moisNum;
    CE = moisNum + addRules(anneeNum);
    PE = addRules(CI) + addRules(CE);
    RH = addRules(PP) + addRules(PE);

    setResultats({
      Jour: addRules(jourNum),
      Mois: moisNum,
      Annee: addRules(anneeNum),
      PP: addRules(PP),
      NE: addRules(NE),
      CI: addRules(CI),
      CE: addRules(CE),
      PE: addRules(PE),
      RH: addRules(RH),
    });

    setCardResultats({
      tarotCardDay: data.find(card => card.id === addRules(jourNum)),
      tarotCardMounth: data.find(card => card.id === moisNum),
      tarotCardYear: data.find(card => card.id === addRules(anneeNum)),
      tarotCardPP: data.find(card => card.id === addRules(PP)),
      tarotCardNE: data.find(card => card.id === addRules(NE)),
      tarotCardCI: data.find(card => card.id === addRules(CI)),
      tarotCardCE: data.find(card => card.id === addRules(CE)),
      tarotCardPE: data.find(card => card.id === addRules(PE)),
      tarotCardRH: data.find(card => card.id === addRules(RH)),
    })

    if (applyRule && jourNum >= 23) {
      const numberAddMois = addRules(moisNum + 1);
      const numberAddPP = addRules(jourNum + numberAddMois + anneeNum);
      const numberAddCI = addRules(jourNum) + numberAddMois;
      const numberAddCE = addRules(numberAddMois + anneeNum);
      const numberAddPE = addRules(numberAddCI + numberAddCE);
      const numberAddRH = addRules(numberAddPP + numberAddPE);

      const applyRuleCardsData = {
        smallCardMounth: data.find(card => card.id === numberAddMois),
        smallCardPP: data.find(card => card.id === numberAddPP),
        smallCardCI: data.find(card => card.id === addRules(numberAddCI)),
        smallCardCE: data.find(card => card.id === numberAddCE),
        smallCardPE: data.find(card => card.id === numberAddPE),
        smallCardRH: data.find(card => card.id === numberAddRH),
      };
      setApplyRuleCards(applyRuleCardsData);
    }

    if (applyLigneRule) {
      ligneJour = addLigneRules(jourNum);
      ligneMois = addLigneRules(moisNum);
      ligneAnnee = addLigneRules(anneeNum);
      const lignePP = addRules(ligneJour + ligneMois + ligneAnnee);
      const ligneNE = addRules(ligneJour + ligneAnnee);
      const ligneCI = addRules(ligneJour + ligneMois);
      const ligneCE = addRules(ligneMois + ligneAnnee);
      const lignePE = addRules(ligneCE + ligneCI);
      const ligneRH = addRules(lignePP + lignePE);

      if (
        ligneResultats.LigneJour !== jourNum ||
        ligneResultats.LigneMois !== moisNum ||
        ligneResultats.LigneAnnee !== addRules(anneeNum)
      ) {
        setDisplayLigne(true);
        setLigneResultats({
          LigneJour: ligneJour,
          LigneMois: ligneMois,
          LigneAnnee: ligneAnnee,
          LignePP: lignePP,
          LigneNE: ligneNE,
          LigneCI: ligneCI,
          LigneCE: ligneCE,
          LignePE: lignePE,
          LigneRH: ligneRH,
        });
      } else {
        setDisplayLigne(false);
      }
    }

    if (applyNumberRule) {
      const numberJour = addLigneRules(jourNum);
      const numberMois = addLigneRules(moisNum);
      const numberAnnee = addLigneRules(anneeNum);
      const numberPP = addLigneRules(jourNum) + addLigneRules(moisNum) + addLigneRules(anneeNum);
      const numberNE = addLigneRules(jourNum) + addLigneRules(anneeNum);
      const numberCI = addLigneRules(jourNum) + addLigneRules(moisNum);
      const numberCE = addLigneRules(moisNum) + addLigneRules(anneeNum);
      const numberPE = numberCE + numberCI;
      const numberRH = numberPP + numberPE;

      setNumberResultats({
        NumberJour: numberJour,
        NumberMois: numberMois,
        NumberAnnee: numberAnnee,
        NumberPP: addLigneRules(numberPP),
        NumberNE: addLigneRules(numberNE),
        NumberCI: addLigneRules(numberCI),
        NumberCE: addLigneRules(numberCE),
        NumberPE: addLigneRules(numberPE),
        NumberRH: addLigneRules(numberRH),
      })
    }
  };

  return (
    <div className='MainDiv'>
      <h1 className='MainTitle'>Calculs à partir de la date de naissance</h1>
      <div className='Form Day'>
        <label htmlFor='birthDay'>Jour de naissance :</label>
        <input name='Day' id='birthDay'
          type="number"
          placeholder="Jour"
          value={jour}
          onChange={(e) => setJour(e.target.value)}
        />
      </div>
      <div className='Form Month'>
        <label htmlFor='birthMonth'>Mois de naissance :</label>
        <input name='Mounth' id='birthMonth'
          type="number"
          placeholder="Mois"
          value={mois}
          onChange={(e) => setMois(e.target.value)}
        />
      </div>
      <div className='Form Year'>
        <label htmlFor='birthYear'>Année de naissance :</label>
        <input name='Year' id='birthYear'
          type="number"
          placeholder="Année"
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
        />
      </div>
      <div className='Form Checkbox'>
        <label htmlFor='ruleDay'><p className='ruleDay'>Appliquer la règle si jour {'>'} 23 </p></label>
        <input name='Rule' id='ruleDay'
          type="checkbox"
          checked={applyRule}
          onChange={() => setApplyRule(!applyRule)}
        />
      </div>
      <div className='Form Checkbox'>
        <label htmlFor='ruleLigne'><p className='ruleLine'>Appliquer la ligne secondaire</p> </label>
        <input name='Rule' id='ruleLigne'
          type="checkbox"
          checked={applyLigneRule}
          onChange={() => setApplyLigneRule(!applyLigneRule)}
        />
      </div>
      <div className='Form Checkbox'>
        <label htmlFor='ruleNumber'><p className='ruleNombre'>Appliquer le nombre secondaire</p> </label>
        <input name='Rule' id='ruleNumber'
          type="checkbox"
          checked={applyNumberRule}
          onChange={() => setApplyNumberRule(!applyNumberRule)}
        />
      </div>
      <button className='CalButton' onClick={calResultats}>
        <p className='CalButtonP'>Calculer</p>
      </button>
      <div>
        <h2 className='TitleRes'>Résultats :</h2>
        <ul className='Resultats'>
          {Object.keys(resultats).map((key, index) => (
            <li key={index} className={`key-${index}`}>
              {key}: {resultats[key]}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className='TitleRes'>Cartes de Tarot :</h2>
        <ul className='Resultats Cartes'>
          <li className='row1'>
            <h3>Jour : </h3>
            <h4>{cardResultats.tarotCardDay ? cardResultats.tarotCardDay.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardDay ? cardResultats.tarotCardDay.cardURL : ''} alt={cardResultats.tarotCardDay ? cardResultats.tarotCardDay.title : ''} />
            {displayLigne ? <h5>{ligneResultats.LigneJour !== null ? ligneResultats.LigneJour : ''}</h5> : applyLigneRule && ligneResultats.LigneJour ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberJour !== null ? numberResultats.NumberJour : ''}</h5>
            )}
          </li>

          <li className='row1'>
            <h3>Mois : </h3>
            <h4>{cardResultats.tarotCardMounth ? cardResultats.tarotCardMounth.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardMounth ? cardResultats.tarotCardMounth.cardURL : ''} alt={cardResultats.tarotCardMounth ? cardResultats.tarotCardMounth.title : ''} />
            {applyRule && (
              <li className='row1 applyRule'>
                <img src={applyRuleCards.smallCardMounth ? applyRuleCards.smallCardMounth.cardURL : ''} alt={applyRuleCards.smallCardMounth ? applyRuleCards.smallCardMounth.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LigneMois !== null ? ligneResultats.LigneMois : ''}</h5> : applyLigneRule && ligneResultats.LigneMois ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberMois !== null ? numberResultats.NumberMois : ''}</h5>
            )}
          </li>

          <li className='row1'>
            <h3>Année : </h3>
            <h4>{cardResultats.tarotCardYear ? cardResultats.tarotCardYear.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardYear ? cardResultats.tarotCardYear.cardURL : ''} alt={cardResultats.tarotCardYear ? cardResultats.tarotCardYear.title : ''} />
            {displayLigne ? <h5>{ligneResultats.LigneAnnee !== null ? ligneResultats.LigneAnnee : ''}</h5> : applyLigneRule && ligneResultats.LigneAnnee ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberAnnee !== null ? numberResultats.NumberAnnee : ''}</h5>
            )}
          </li>

          <li className='row1'>
            <h3>Personnalité Profonde : </h3>
            <h4>{cardResultats.tarotCardPP ? cardResultats.tarotCardPP.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardPP ? cardResultats.tarotCardPP.cardURL : ''} alt={cardResultats.tarotCardPP ? cardResultats.tarotCardPP.title : ''} />
            {applyRule && (
              <li className='row1 applyRule'>
                <img src={applyRuleCards.smallCardPP ? applyRuleCards.smallCardPP.cardURL : ''} alt={applyRuleCards.smallCardPP ? applyRuleCards.smallCardPP.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LignePP !== null ? ligneResultats.LignePP : ''}</h5> : applyLigneRule && ligneResultats.LignePP ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberPP !== null ? numberResultats.NumberPP : ''}</h5>
            )}
          </li>

          <li className='row2'>
            <h3>Noeud Emotionnel : </h3>
            <h4>{cardResultats.tarotCardNE ? cardResultats.tarotCardNE.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardNE ? cardResultats.tarotCardNE.cardURL : ''} alt={cardResultats.tarotCardNE ? cardResultats.tarotCardNE.title : ''} />
            {displayLigne ? <h5>{ligneResultats.LigneNE !== null ? ligneResultats.LigneNE : ''}</h5> : applyLigneRule && ligneResultats.LigneNE ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberNE !== null ? numberResultats.NumberNE : ''}</h5>
            )}
          </li>

          <li className='row3'>
            <h3>Comportement Intérieur : </h3>
            <h4>{cardResultats.tarotCardCI ? cardResultats.tarotCardCI.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardCI ? cardResultats.tarotCardCI.cardURL : ''} alt={cardResultats.tarotCardCI ? cardResultats.tarotCardCI.title : ''} />
            {applyRule && (
              <li className='row3 applyRule'>
                <img src={applyRuleCards.smallCardCI ? applyRuleCards.smallCardCI.cardURL : ''} alt={applyRuleCards.smallCardCI ? applyRuleCards.smallCardCI.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LigneCI !== null ? ligneResultats.LigneCI : ''}</h5> : applyLigneRule && ligneResultats.LigneCI ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberCI !== null ? numberResultats.NumberCI : ''}</h5>
            )}
          </li>

          <li className='row3 CE'>
            <h3>Comportement Extérieur : </h3>
            <h4>{cardResultats.tarotCardCE ? cardResultats.tarotCardCE.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardCE ? cardResultats.tarotCardCE.cardURL : ''} alt={cardResultats.tarotCardCE ? cardResultats.tarotCardCE.title : ''} />
            {applyRule && (
              <li className='row3 applyRule'>
                <img src={applyRuleCards.smallCardCE ? applyRuleCards.smallCardCE.cardURL : ''} alt={applyRuleCards.smallCardCE ? applyRuleCards.smallCardCE.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LigneCE !== null ? ligneResultats.LigneCE : ''}</h5> : applyLigneRule && ligneResultats.LigneCE ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberCE !== null ? numberResultats.NumberCE : ''}</h5>
            )}
          </li>

          <li className='row4'>
            <h3>Personnalité Extérieure : </h3>
            <h4>{cardResultats.tarotCardPE ? cardResultats.tarotCardPE.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardPE ? cardResultats.tarotCardPE.cardURL : ''} alt={cardResultats.tarotCardPE ? cardResultats.tarotCardPE.title : ''} />
            {applyRule && (
              <li className='row4 applyRule'>
                <img src={applyRuleCards.smallCardPE ? applyRuleCards.smallCardPE.cardURL : ''} alt={applyRuleCards.smallCardPE ? applyRuleCards.smallCardPE.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LignePE !== null ? ligneResultats.LignePE : ''}</h5> : applyLigneRule && ligneResultats.LignePE ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberPE !== null ? numberResultats.NumberPE : ''}</h5>
            )}
          </li>

          <li className='row4'>
            <h3>Recherche Harmonie : </h3>
            <h4>{cardResultats.tarotCardRH ? cardResultats.tarotCardRH.title : 'Not found'}</h4>
            <img src={cardResultats.tarotCardRH ? cardResultats.tarotCardRH.cardURL : ''} alt={cardResultats.tarotCardRH ? cardResultats.tarotCardRH.title : ''} />
            {applyRule && (
              <li className='row4 applyRule'>
                <img src={applyRuleCards.smallCardRH ? applyRuleCards.smallCardRH.cardURL : ''} alt={applyRuleCards.smallCardRH ? applyRuleCards.smallCardRH.title : ''} />
              </li>
            )}
            {displayLigne ? <h5>{ligneResultats.LigneRH !== null ? ligneResultats.LigneRH : ''}</h5> : applyLigneRule && ligneResultats.LigneRH ? <h5>Pas de ligne secondaire</h5> : ''}
            {applyNumberRule && (
              <h5 className='hNumber'>{numberResultats.NumberRH !== null ? numberResultats.NumberRH : ''}</h5>
            )}
          </li>
        </ul>
      </div >
    </div >
  );
}

export default CalDateBirth;