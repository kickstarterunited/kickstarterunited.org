export default function ProjectList() {
  const slugs: string[] = [
    "ironspike/rigsby-wi-volume-2-burn-it-down-by-se-case",
    "ww3/poisongirls",
    "restorationgames/return-to-dark-tower-expeditions",
    "shiftrpg/shift-rpg",
    "apexpublications/apex-magazine-2026",
    "theninagalaxy/to-love-like-venus",
    "746734715/barbarous-chapter-6-leeds-sized-edition",
    "secondatbest/those-that-inherit-the-earth-volume-1",
    "dwythe/danse-macabre-medieval-horror-roleplaying",
    "brainfruitstudio/starfriends-card-game",
  ];

  return (
    <>
      {slugs.map((slug) => (
        <li class="m-1">
          <iframe
            class="sm:w-[248px] sm:h-[397px] w-[170px] h-[360px]"
            src={`https://www.kickstarter.com/projects/${slug}/widget/card.html?v=2`}
          ></iframe>
        </li>
      ))}
    </>
  );
}
