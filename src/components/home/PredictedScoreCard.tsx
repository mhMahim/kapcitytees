import { CheckCircle } from "lucide-react";

interface SkillScoreProps {
  skill: string;
  score: number;
  maxScore?: number;
  color: string;
}

const SkillScore: React.FC<SkillScoreProps> = ({
  skill,
  score,
  maxScore = 9,
  color,
}) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[#212B36] text-base font-medium">{skill}</span>
        <span className="text-[#212B36] text-base font-semibold">{score}</span>
      </div>
      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

const PredictedScoreCard = () => {
  const skills = [
    { skill: "Listening", score: 8.5, color: "#22C55E" },
    { skill: "Reading", score: 8.0, color: "#3B82F6" },
    { skill: "Writing", score: 7.5, color: "#EAB308" },
    { skill: "Speaking", score: 7.5, color: "#A855F7" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] p-8 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
          <CheckCircle className="size-8 text-[#22C55E]" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#637381]">Your Predicted Score</span>
          <span className="text-[#212B36] text-2xl font-semibold leading-none">
            Band 8.0
          </span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-3">
        {skills.map((item) => (
          <SkillScore
            key={item.skill}
            skill={item.skill}
            score={item.score}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default PredictedScoreCard;
