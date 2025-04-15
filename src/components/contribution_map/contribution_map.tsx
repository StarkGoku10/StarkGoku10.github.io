import React from "react";
import GitHubCalendar from "react-github-calendar";
import "./contribution_map.scss";

const ContributionMap: React.FC = () => {
  const labels = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    totalCount: '{{count}} contributions in 2025', 
    legend: {
      less: 'Less',
      more: 'More',
    },
  };

  return (
    <div className="contribution-map-container">
      <section className="contribution-map">
        <h2>My GitHub Contributions</h2>
        <div className="react-github-calendar">
          <div className="calendar-wrapper">
            <GitHubCalendar
              username="StarkGoku10"
              blockSize={18}
              fontSize={16}
              theme={{
                light: ["#ffffff", "#80e6e6", "#33cccc", "#01AFAF", "#05A5A5"],
                dark: ["#ffffff", "#80e6e6", "#33cccc", "#01AFAF", "#05A5A5"],
              }}
              labels={labels}
              showWeekdayLabels={true}
              blockMargin={4}
              blockRadius={4}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContributionMap;
