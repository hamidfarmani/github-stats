
import PageContainer from "../components/PageContainer";
import { SearchUsername } from "../components/Search/SearchUsername";

export default function HomePage() {
  return (
    <PageContainer title="GitHub stats">
      <SearchUsername />
    </PageContainer>
  );
}
