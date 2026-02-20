import SidebarButton from './sidebar-button';
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="h-screen min-w-[168px] max-w-[280px] bg-primary-egg py-6">
      <div className="flex flex-col gap-8">
        <Link href={'/home'} className="px-4 text-2xl font-semibold text-primary-maru">
          MARU-EGG <br /> ADMIN
        </Link>
        <div className="flex flex-col">
          <SidebarButton name="홈" href="/home" />
          <SidebarButton name="질문 목록" href="/question-list" />
          <SidebarButton name="전형 활성화" href="/admission-active" />
          <SidebarButton name="추가 정보 입력" href="/admission-extra" />
          <SidebarButton name="전형 상세 관리" href="/admission-detail" />
          <SidebarButton name="학과 상세 관리" href="/major-detail" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
