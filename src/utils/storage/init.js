import interestList from "./interestList";
import lastVisitedDate from "./lastVisitedDate";
import recentList from "./recentList";

export const initStorage = () => {
  interestList.init();
  recentList.init();
  lastVisitedDate.init();
};

if (new Date().getDate() !== lastVisitedDate.get()) {
  initStorage();
} else {
  if (!interestList.isExist()) {
    interestList.init();
  }

  if (!recentList.isExist()) {
    recentList.init();
  }
}
