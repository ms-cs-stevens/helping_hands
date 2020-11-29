module.exports = [
  {
    // admin user
    _id: 1,
    email: 'masterdetective123@gmail.com',
    firstName: 'Sherlock',
    lastName: 'Holmes',
    gender: 'Male',
    role_id: 1,
    profession: 'Detective',
    bio:
      "Sherlock Holmes (/ˈʃɜːrlɒk ˈhoʊmz/) is a fictional private detective created by British author Sir Arthur Conan Doyle. Known as a 'consulting detective' in the stories, Holmes is known for a proficiency with observation, forensic science, and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.",
    hashedPassword:
      '$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.',
    // Password: 'elementarymydearwatson'
  },
  {
    // donor user
    _id: 2,
    email: 'lemon@gmail.com',
    firstName: 'Elizabeth',
    lastName: 'Lemon',
    gender: 'Female',
    role_id: 2,
    profession: 'Writer',
    bio:
      "Elizabeth Miervaldis 'Liz' Lemon is the main character of the American television series 30 Rock. She created and writes for the fictional comedy-sketch show The Girlie Show or TGS with Tracy Jordan.",
    hashedPassword:
      '$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm',
    // Password: 'damnyoujackdonaghy'
  },
  {
    // recipient user
    _id: 3,
    email: 'theboywholived@gmail.com',
    firstName: 'Harry',
    lastName: 'Potter',
    gender: 'Male',
    role_id: 3,
    profession: 'Student',
    bio:
      "Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry . The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic, and subjugate all wizards and Muggles.",
    hashedPassword:
      '$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK',
    // Password: 'quidditch'
  },
];
