/**
 * Vercel Speed Insights initialization for static site
 * This script initializes Speed Insights tracking when deployed to Vercel.
 * Note: Speed Insights only works in production on Vercel, not in development.
 */
(function() {
  // Initialize the Speed Insights queue
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // The actual Speed Insights script will be automatically injected by Vercel
  // when the site is deployed and Speed Insights is enabled in the dashboard.
  // This initialization ensures the queue is ready to receive events.
})();
