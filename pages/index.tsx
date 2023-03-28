import PageContainer from "../components/PageContainer";
import { Repositories } from "../components/Repositories/Repositories";
import { SearchUsername } from "../components/Search/SearchUsername";

export default function HomePage() {
  return (
    <PageContainer title="GitHub stats">
      <SearchUsername />
      <Repositories />
    </PageContainer>
  );
}
