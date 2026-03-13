// Equipment Store - Centralized state management for equipment, requests, and donations
// This store handles all equipment-related operations including requests, donations, and available items
import { defineStore } from "pinia";
import { ref } from "vue";

// Create and export the equipment store using Pinia
export const useEquipmentStore = defineStore("equipment", () => {
  // ===== STATE =====
  // Array to store all equipment requests made by users
  const requests = ref([]);

  // Array to store all donations made by donors
  const donations = ref([]);

  // Array of available equipment items that users can request
  // This is the catalog of donated items available for recipients
  const availableItems = ref([
    {
      id: 1,
      name: "Manual Wheelchair",
      icon: "♿",
      image: new URL("../images/chaire.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-teal-pale to-[#C5E4DC]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 4 km",
      description:
        "Adult size, foldable, good condition. Used for 8 months after accident recovery.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "mobility",
      views: 14,
    },
    {
      id: 2,
      name: "Rollator Walker",
      icon: "🚶",
      image: new URL("../images/crutches.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-teal-pale to-[#B2DFDB]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 3 km",
      description:
        "4-wheel rollator with seat and brakes. Great for outdoor use. Adjustable height.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "mobility",
      views: 9,
    },
    {
      id: 3,
      name: "Forearm Crutches",
      icon: "🩼",
      image: new URL(
        "../images/other-crutches-icon-simple-style-vector.jpg",
        import.meta.url,
      ).href,
      bgClass: "bg-gradient-to-br from-[#E8F4F1] to-[#C5E4DC]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 7 km",
      description:
        "Pair of aluminum forearm crutches, barely used. Adjustable for height 150–185cm.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "mobility",
      views: 5,
    },
    {
      id: 4,
      name: "Behind-the-Ear Hearing Aid",
      icon: "👂",
      image: new URL("../images/hearing_aid.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]",
      category: "Hearing",
      categoryColor: "text-amber",
      distance: "📍 5 km",
      description:
        "Left ear BTE hearing aid, near new condition. Comes with extra batteries and case.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "hearing",
      views: 12,
    },
    {
      id: 5,
      name: "Amplified Telephone",
      icon: "📞",
      image: new URL("../images/hearing_aid.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-[#FFF3E0] to-[#FFECB3]",
      category: "Hearing",
      categoryColor: "text-amber",
      distance: "📍 8 km",
      description:
        "Extra-loud landline phone with visual ringer for people with hearing loss.",
      condition: "Good condition",
      conditionClass: "bg-[#FFF3E0] text-amber",
      cat: "hearing",
      views: 7,
    },
    {
      id: 6,
      name: "White Mobility Cane",
      icon: "🦯",
      image: new URL("../images/white_cane.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-teal-pale to-[#B2DFDB]",
      category: "Vision",
      categoryColor: "text-teal-lt",
      distance: "📍 2 km",
      description:
        "Folding white cane, 120cm. Used briefly, near-new. Correct grip and tip included.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "vision",
      views: 8,
    },
    {
      id: 7,
      name: "Bath Safety Seat",
      icon: "🛁",
      image: new URL("../images/bathtub_aid.jpg", import.meta.url).href,
      bgClass: "bg-gradient-to-br from-[#F0F8F6] to-[#C5E4DC]",
      category: "Daily Living",
      categoryColor: "text-teal-mid",
      distance: "📍 6 km",
      description:
        "Adjustable bath bench with non-slip feet. Supports up to 135kg. Lightweight.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "daily",
      views: 3,
    },
    {
      id: 8,
      name: "Digital Reminder Clock",
      icon: "🕐",
      image: new URL(
        "../images/Where-to-Donate-Disability-Equipment-in-Australia.webp",
        import.meta.url,
      ).href,
      bgClass: "bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE]",
      category: "Cognitive",
      categoryColor: "text-purple-600",
      distance: "📍 9 km",
      description:
        "Large-display day/date/time clock with medication reminder alarms. For dementia care.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "cognitive",
      views: 6,
    },
  ]);

  // ===== ACTIONS =====
  // Create a new equipment request
  // Called when a recipient requests an available item
  // Generates a request object with unique ID and default status
  const createRequest = (item) => {
    const newRequest = {
      id: Date.now(),
      itemId: item.id,
      name: item.name,
      icon: item.icon,
      donor: `Donor: ${item.donor || "Anonymous"}`,
      location: item.location || "Kigali",
      time: "Requested just now",
      status: "Pending",
      pillClass: "pill-pending",
      borderClass: "border-amber/15",
      altAction: "Waiting...",
    };

    requests.value.push(newRequest);
    return newRequest;
  };

  // Update the status of an existing request
  // Called when donors approve or deny requests
  // Updates UI elements (colors, buttons) based on new status
  const updateRequestStatus = (requestId, newStatus) => {
    const request = requests.value.find((r) => r.id === requestId);
    if (request) {
      request.status = newStatus;
      request.time = `Updated ${newStatus.toLowerCase()}`;

      // Update styling based on status
      if (newStatus === "Approved") {
        request.pillClass = "pill-approved";
        request.borderClass = "border-teal/10";
        request.action = "Arrange Pickup";
        delete request.altAction;
      } else if (newStatus === "Denied") {
        request.pillClass = "pill-denied";
        request.borderClass = "border-red-100";
        request.opacity = true;
        request.action = "Find Similar";
        request.actionClass = "hover:bg-teal-mid";
      }
    }
  };

  // Remove a request completely from the store
  // Called when permanently deleting a request
  // Finds request by ID and removes it from the array
  const removeRequest = (requestId) => {
    const index = requests.value.findIndex((r) => r.id === requestId);
    if (index > -1) {
      requests.value.splice(index, 1);
    }
  };

  // Cancel a request and handle related operations
  // Called when user cancels their own request
  // Also cancels duplicate requests for same equipment type
  // Removes equipment from available items to prevent new requests
  const cancelRequest = (requestId) => {
    const request = requests.value.find((r) => r.id === requestId);
    if (request) {
      // Mark as cancelled
      request.status = "Cancelled";
      request.time = "Cancelled just now";
      request.pillClass = "pill-cancelled";
      request.borderClass = "border-gray-100";
      request.opacity = true;
      request.altAction = "Request cancelled";
      delete request.action;

      // Remove any pending requests for the same equipment type
      const sameTypeRequests = requests.value.filter(
        (r) =>
          r.id !== requestId &&
          r.status === "Pending" &&
          r.name.toLowerCase() === request.name.toLowerCase(),
      );

      sameTypeRequests.forEach((r) => {
        r.status = "Cancelled";
        r.time = "Auto-cancelled (duplicate)";
        r.pillClass = "pill-cancelled";
        r.borderClass = "border-gray-100";
        r.opacity = true;
        r.altAction = "Auto-cancelled";
        delete r.action;
      });

      // Remove the cancelled equipment from available items to prevent new requests
      const equipmentIndex = availableItems.value.findIndex(
        (item) => item.name.toLowerCase() === request.name.toLowerCase(),
      );

      if (equipmentIndex > -1) {
        availableItems.value.splice(equipmentIndex, 1);
      }
    }
  };

  // Add a new donation to the store
  // Called when donors list equipment for donation
  // Creates a donation object with unique ID and default status
  const addDonation = (donation) => {
    const newDonation = {
      id: Date.now(),
      ...donation,
      status: "Listed",
      time: "Listed just now",
    };
    donations.value.push(newDonation);
    return newDonation;
  };

  // Update the status of an existing donation
  // Called when donation status changes (e.g., from Listed to Donated)
  // Updates the donation object with new status and timestamp
  const updateDonationStatus = (donationId, newStatus) => {
    const donation = donations.value.find((d) => d.id === donationId);
    if (donation) {
      donation.status = newStatus;
      donation.time = `Updated ${newStatus.toLowerCase()}`;
    }
  };

  // ===== GETTERS =====
  // Filter requests by their status
  // Returns array of requests matching the specified status (Pending, Approved, Denied, etc.)
  const getRequestsByStatus = (status) => {
    return requests.value.filter((r) => r.status === status);
  };

  // Filter donations by their status
  // Returns array of donations matching the specified status (Listed, Donated, etc.)
  const getDonationsByStatus = (status) => {
    return donations.value.filter((d) => d.status === status);
  };

  // ===== RETURN =====
  // Expose all state, actions, and getters for components to use
  return {
    // State variables
    requests, // Array of all equipment requests
    donations, // Array of all donations
    availableItems, // Array of available equipment items

    // Action functions
    createRequest, // Function to create new equipment request
    updateRequestStatus, // Function to update request status
    removeRequest, // Function to remove request completely
    cancelRequest, // Function to cancel request with auto-cancellation
    addDonation, // Function to add new donation
    updateDonationStatus, // Function to update donation status

    // Getter functions
    getRequestsByStatus, // Function to filter requests by status
    getDonationsByStatus, // Function to filter donations by status
  };
});
