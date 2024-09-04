import { Schema, model, models, Document } from "mongoose";
export interface IProject {
  _id: string;
  project_name: string;
  project_scope: string;
  feature: string[];
  technical_stack: string[];
  development_plan: {
    milestone: string;
    tasks: string[];
    timeline: string;
  }[];
  resource_allocation: string[];
  risk_assessment: {
    risk: string;
    mitigation: string;
  }[];
  final_deliverables: string[];
  youtube_videos_id?: string[];
  isdone?: boolean;
}

const projectSchema = new Schema<IProject>({
  project_name: {
    type: String,
    required: true,
  },
  project_scope: {
    type: String,
    required: true,
  },
  feature: {
    type: [String],
    required: true,
  },
  technical_stack: {
    type: [String],
    required: true,
  },
  development_plan: {
    type: [{ milestone: String, tasks: [String], timeline: String }],
    required: true,
  },
  resource_allocation: {
    type: [String],
    required: true,
  },
  risk_assessment: {
    type: [{ risk: String, mitigation: String }],
    required: true,
  },
  final_deliverables: {
    type: [String],
    required: true,
  },
  youtube_videos_id: {
    type: [String],
    required: false,
  },
  isdone: {
    type: Boolean,
    default: false,
  },
});
export function getModel(colName: string) {
  return models[colName] || model<IProject>(colName, projectSchema);
}
