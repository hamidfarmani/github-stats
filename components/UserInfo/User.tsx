import { SimpleGrid } from "@mantine/core";
import { LanguageChart } from "../Charts/LanguageChart";
import { DetailsCard } from "./DetailsCard";
import { MostStarredChart } from "../Charts/MostStarredChart";
import { StarPerLanguageChart } from "../Charts/StarPerLanguageChart";

type UserInformation = {
  name: string;
  avatar_url: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
  created_at: string;
  public_repos: number;
  login: string;
  html_url: string;
};

export function User({
  name,
  avatar_url,
  location,
  bio,
  followers,
  following,
  created_at,
  public_repos,
  login,
  html_url,
}: UserInformation) {
  const stats = [
    { value: followers, label: "Followers" },
    { value: following, label: "Follows" },
    { value: public_repos, label: "Repos" },
  ];
  return (
    <>
      <DetailsCard
        avatar_url={avatar_url}
        name={name}
        location={location}
        bio={bio}
        stats={stats}
        created_at={created_at}
        html_url={html_url}
      />
      <SimpleGrid cols={3} pb="lg">
        <LanguageChart
          userData={{
            name,
            avatar_url,
            location,
            bio,
            followers,
            following,
            created_at,
            public_repos,
            login,
            html_url,
          }}
        />
        <MostStarredChart login={login} />
        <StarPerLanguageChart login={login} />
      </SimpleGrid>
    </>
  );
}
