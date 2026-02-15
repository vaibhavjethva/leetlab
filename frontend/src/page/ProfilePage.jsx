import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import {
  User,
  Mail,
  Calendar,
  Code,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const { submissions, getAllSubmissions, isLoading } = useSubmissionStore();

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Calculate stats
  const totalSubmissions = submissions?.length || 0;
  const acceptedSubmissions =
    submissions?.filter((s) => s.status === "Accepted").length || 0;
  const acceptanceRate =
    totalSubmissions > 0
      ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)
      : 0;

  // Get unique solved problems
  const solvedProblems = new Set(
    submissions?.filter((s) => s.status === "Accepted").map((s) => s.problemId)
  );
  const problemsSolved = solvedProblems.size;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get recent submissions (last 10)
  const recentSubmissions = submissions?.slice(0, 10) || [];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Background blur effect */}
        <div className="absolute top-20 left-0 w-1/3 h-1/3 bg-primary opacity-20 blur-3xl rounded-full -z-10"></div>

        {/* Profile Header */}
        <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/30">
                <img
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {authUser?.role === "ADMIN" && (
                <span className="absolute -bottom-1 -right-1 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-base-content">
                {authUser?.name || "User"}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-base-content/70">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{authUser?.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Joined{" "}
                    {authUser?.createdAt
                      ? formatDate(authUser.createdAt)
                      : "Recently"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-base-content">
              {problemsSolved}
            </p>
            <p className="text-sm text-base-content/70">Problems Solved</p>
          </div>

          <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <p className="text-2xl font-bold text-base-content">
              {totalSubmissions}
            </p>
            <p className="text-sm text-base-content/70">Total Submissions</p>
          </div>

          <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-base-content">
              {acceptedSubmissions}
            </p>
            <p className="text-sm text-base-content/70">Accepted</p>
          </div>

          <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-base-content">
              {acceptanceRate}%
            </p>
            <p className="text-sm text-base-content/70">Acceptance Rate</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Submissions
          </h2>

          {recentSubmissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Language</th>
                    <th>Runtime</th>
                    <th>Memory</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover">
                      <td>
                        <div className="flex items-center gap-2">
                          {submission.status === "Accepted" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={
                              submission.status === "Accepted"
                                ? "text-green-500 font-medium"
                                : "text-red-500 font-medium"
                            }
                          >
                            {submission.status}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost">
                          {submission.language}
                        </span>
                      </td>
                      <td>{submission.time || "N/A"}</td>
                      <td>{submission.memory || "N/A"}</td>
                      <td className="text-base-content/70">
                        {formatDate(submission.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Code className="w-12 h-12 mx-auto text-base-content/30 mb-2" />
              <p className="text-base-content/70">No submissions yet</p>
              <Link to="/" className="btn btn-primary btn-sm mt-4">
                Start Solving Problems
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
