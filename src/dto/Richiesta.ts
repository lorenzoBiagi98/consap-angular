import { Applicativo } from "./Applicativo";
import { CommessaOS } from "./CommessaOS";
import { StatoApprovazioneCONSAP } from "./StatoApprovazioneCONSAP";
import { StatoApprovazioneOS } from "./StatoApprovazioneOS";
import { StatoRichiestaCONSAP } from "./StatoRichiestaCONSAP";
import { StatoRichiestaOS } from "./StatoRichiestaOS";

export interface Richiesta {
  id: number;
  numeroTicket: number;
  applicativo: Applicativo;
  oggetto: string;
  statoRichiestaConsap: StatoRichiestaCONSAP;
  dataCreazione: Date;
  statoApprovazioneConsap: StatoApprovazioneCONSAP;
  statoApprovazioneOs: StatoApprovazioneOS;
  statoRichiestaOs: StatoRichiestaOS;
  dataStimaFinale: Date;
  importo: number;
  commessaOs: CommessaOS;
  dataInserimento: Date
}
