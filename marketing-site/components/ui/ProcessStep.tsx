type ProcessStepProps = {
  number: number | string;
  title: string;
  description: string;
};

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-none w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center font-display font-extrabold text-[1.125rem]">
        {number}
      </div>
      <div>
        <div className="font-display font-bold text-h4 text-charcoal mb-1">{title}</div>
        <p className="font-body text-body-sm leading-normal text-text-secondary m-0">
          {description}
        </p>
      </div>
    </div>
  );
}
