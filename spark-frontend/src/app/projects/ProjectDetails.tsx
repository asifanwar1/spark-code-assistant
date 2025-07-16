import React from "react";
import { InputField } from "@/components/Input";
import { SelectField } from "@/components/SelectField";
import { TextArea } from "@/components/TextArea";
import { frameworks } from "@/constants/framworks";
import { IProjectDetailsFormProps } from "./projects.types";

const ProjectDetails: React.FC<IProjectDetailsFormProps> = ({
    register,
    errors,
}) => {
    return (
        <>
            <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#22c55e] animate-pulse" />

                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-br from-white to-[#a0a0a0] bg-clip-text text-transparent">
                    Project Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                        label="Project Name *"
                        type="text"
                        placeholder="Enter project name"
                        registration={register("projectName", {
                            required: "Project name is required",
                        })}
                        // error={errors}
                    />
                    <SelectField
                        label="Framework"
                        options={frameworks}
                        registration={register("selectedFramework")}
                        // error={errors}
                    />

                    <div className="md:col-span-2 space-y-2">
                        <TextArea
                            label="Description"
                            registration={register("description")}
                            placeholder="Describe your project..."
                            rows={3}
                            // error={errors}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;
