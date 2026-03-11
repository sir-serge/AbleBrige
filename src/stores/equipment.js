import { defineStore } from "pinia";
import { ref } from "vue";

export const useEquipmentStore = defineStore("equipment", () => {
  // State
  const requests = ref([]);
  const donations = ref([]);
  const availableItems = ref([
    {
      id: 1,
      name: "Manual Wheelchair",
      icon: "♿",
      bgClass: "bg-gradient-to-br from-teal-pale to-[#C5E4DC]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 4 km",
      description:
        "Adult size, foldable, good condition. Used for 8 months after accident recovery.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "mobility",
    },
    {
      id: 2,
      name: "Rollator Walker",
      icon: "🚶",
      bgClass: "bg-gradient-to-br from-teal-pale to-[#B2DFDB]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 3 km",
      description:
        "4-wheel rollator with seat and brakes. Great for outdoor use. Adjustable height.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "mobility",
    },
    {
      id: 3,
      name: "Forearm Crutches",
      icon: "🩼",
      bgClass: "bg-gradient-to-br from-[#E8F4F1] to-[#C5E4DC]",
      category: "Mobility",
      categoryColor: "text-teal",
      distance: "📍 7 km",
      description:
        "Pair of aluminum forearm crutches, barely used. Adjustable for height 150–185cm.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "mobility",
    },
    {
      id: 4,
      name: "Behind-the-Ear Hearing Aid",
      icon: "👂",
      bgClass: "bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]",
      category: "Hearing",
      categoryColor: "text-amber",
      distance: "📍 5 km",
      description:
        "Left ear BTE hearing aid, near new condition. Comes with extra batteries and case.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "hearing",
    },
    {
      id: 5,
      name: "Amplified Telephone",
      icon: "📞",
      bgClass: "bg-gradient-to-br from-[#FFF3E0] to-[#FFECB3]",
      category: "Hearing",
      categoryColor: "text-amber",
      distance: "📍 8 km",
      description:
        "Extra-loud landline phone with visual ringer for people with hearing loss.",
      condition: "Good condition",
      conditionClass: "bg-[#FFF3E0] text-amber",
      cat: "hearing",
    },
    {
      id: 6,
      name: "White Mobility Cane",
      icon: "🦯",
      bgClass: "bg-gradient-to-br from-teal-pale to-[#B2DFDB]",
      category: "Vision",
      categoryColor: "text-teal-lt",
      distance: "📍 2 km",
      description:
        "Folding white cane, 120cm. Used briefly, near-new. Correct grip and tip included.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "vision",
    },
    {
      id: 7,
      name: "Bath Safety Seat",
      icon: "🛁",
      bgClass: "bg-gradient-to-br from-[#F0F8F6] to-[#C5E4DC]",
      category: "Daily Living",
      categoryColor: "text-teal-mid",
      distance: "📍 6 km",
      description:
        "Adjustable bath bench with non-slip feet. Supports up to 135kg. Lightweight.",
      condition: "Good condition",
      conditionClass: "bg-teal-pale text-teal",
      cat: "daily",
    },
    {
      id: 8,
      name: "Digital Reminder Clock",
      icon: "🕐",
      bgClass: "bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE]",
      category: "Cognitive",
      categoryColor: "text-purple-600",
      distance: "📍 9 km",
      description:
        "Large-display day/date/time clock with medication reminder alarms. For dementia care.",
      condition: "Like New",
      conditionClass: "bg-green-50 text-green-700",
      cat: "cognitive",
    },
  ]);

  // Actions
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

  const removeRequest = (requestId) => {
    const index = requests.value.findIndex((r) => r.id === requestId);
    if (index > -1) {
      requests.value.splice(index, 1);
    }
  };

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

  const updateDonationStatus = (donationId, newStatus) => {
    const donation = donations.value.find((d) => d.id === donationId);
    if (donation) {
      donation.status = newStatus;
      donation.time = `Updated ${newStatus.toLowerCase()}`;
    }
  };

  // Getters
  const getRequestsByStatus = (status) => {
    return requests.value.filter((r) => r.status === status);
  };

  const getDonationsByStatus = (status) => {
    return donations.value.filter((d) => d.status === status);
  };

  return {
    // State
    requests,
    donations,
    availableItems,

    // Actions
    createRequest,
    updateRequestStatus,
    removeRequest,
    cancelRequest,
    addDonation,
    updateDonationStatus,

    // Getters
    getRequestsByStatus,
    getDonationsByStatus,
  };
});
