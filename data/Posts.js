import users from "./users";
const Posts = [
  {
    name: users[0].name,
    image_url: "https://i.ibb.co/DLj8jsJ/kohili.png",
    profile_picture: users[0].image_url,
    liked_by_users: [],
    caption: "Onto the next one ❤️👍",
    comments: [],
  },
  {
    name: users[1].name,
    image_url: "https://i.ibb.co/SJrbmRZ/naz.png",
    profile_picture: users[1].image_url,
    caption: "BUILDING AN EPIC ReactJS module for you",
    comments: [],
    liked_by_users: [],
  },
  {
    name: users[2].name,
    image_url: "https://i.ibb.co/RB0q3Gd/qazi.png",
    profile_picture: users[2].image_url,
    liked_by_users: [],
    caption:
      "6 JavaScript data structures you must know 👉😱 Array,Queues,Linked List,Trees,Graphs,Hashtable/map ",
    comments: [
      {
        name: "techkaya",
        comment: "Lit thanks for the description 🔥",
      },
      {
        name: "mashstatic",
        comment: "You need to know DS & A if you want an amazing code 😉",
      },
    ],
  },
  {
    name: users[3].name,
    image_url: "https://i.imgur.com/W2MOTfE.png",
    profile_picture: users[3].image_url,
    liked_by_users: [],
    comments: [],
  },
  {
    name: users[4].name,
    image_url: "https://i.ibb.co/k0dMCmd/praveen.png",
    profile_picture: users[4].image_url,
    liked_by_users: [],
    caption: "A Random click makes picture adorable.",
    comments: [],
  },
  {
    name: users[5].name,
    image_url: "https://gcdn.pbrd.co/images/SysV2gL1iksB.png?o=1",
    profile_picture: users[5].image_url,
    liked_by_users: [],
    comments: [
      {
        name: "gulzar_singhh",
        comment: "Nice hair😂🔥",
      },
    ],
  },

  {
    name: users[6].name,
    image_url: "https://i.ibb.co/k0VrgPc/veera.png",
    profile_picture: users[6].image_url,
    liked_by_users: [],
    caption: "Some Where in the Earth",
    comments: [
      {
        name: "the__sys",
        comment: "🔥😍",
      },
    ],
  },
  {
    name: users[7].name,
    image_url: "https://i.ibb.co/v340dWC/denny.png",
    profile_picture: users[7].image_url,
    caption:
      "Do Smile...what ever the situation you face....accept it..#peace ✌",
    liked_by_users: [],
    comments: [],
  },
];

export default Posts;
