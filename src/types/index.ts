export interface Team {
  id: string;
  name: string;
}

export interface Player {
  id: string;     
  teamId: string; 
  name: string;
  number: number;
  position: string;
}

//team ve player ı birden fazla yerde kullandıgımız için once ayrı bir dosyada tanımlayıp,
//diger yerlerde kullanabilmek için de export etmemiz gerekiyor